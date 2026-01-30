"use client";

import React, { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  addDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInAnonymously, 
  signInWithCustomToken 
} from 'firebase/auth';
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from 'firebase/storage';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Upload, 
  CheckCircle, 
  Loader2, 
  MapPin, 
  Package,
  ChevronRight,
  AlertCircle,
  LogOut,
  Globe,
  LayoutDashboard
} from 'lucide-react';

// --- Firebase Configuration & Initialization ---
// We use a safe check for the configuration variable to prevent crashes if it's missing
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

/**
 * AdminDashboard - Unified Content Management Hub
 * Handles Authentication, Real-time Data Sync, and Media Uploads.
 */
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('destinations');
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', description: '', price: '', imageFile: null, imageUrl: '' });
  const [editingId, setEditingId] = useState(null);

  // --- 1. Authentication Lifecycle ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    };

    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- 2. Real-time Data Synchronization ---
  useEffect(() => {
    if (!user) return;

    // Following strict path Rule 1 for collaborative data
    const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', activeTab);
    
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const fetchedItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort in memory by updatedAt or createdAt (Rule 2)
      const sortedItems = fetchedItems.sort((a, b) => {
        const timeA = a.updatedAt?.seconds || 0;
        const timeB = b.updatedAt?.seconds || 0;
        return timeB - timeA;
      });
      
      setItems(sortedItems);
    }, (error) => {
      console.error("Firestore sync error:", error);
    });

    return () => unsubscribe();
  }, [user, activeTab]);

  // --- 3. Interaction Handlers ---
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    let finalImageUrl = formData.imageUrl;

    try {
      // Step A: Handle Cloud Storage Upload
      if (formData.imageFile) {
        const storageRef = ref(storage, `artifacts/${appId}/${activeTab}/${Date.now()}_${formData.imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.imageFile);

        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            }, 
            (error) => reject(error), 
            async () => {
              finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Step B: Prepare Payload
      const payload = {
        name: formData.name,
        description: formData.description,
        image: finalImageUrl,
        updatedAt: serverTimestamp(),
        authorId: user.uid
      };

      if (activeTab === 'packages') {
        payload.price = parseFloat(formData.price) || 0;
      }

      // Step C: Save to Firestore
      if (editingId) {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', activeTab, editingId);
        await updateDoc(docRef, payload);
      } else {
        const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', activeTab);
        await addDoc(collectionRef, { ...payload, createdAt: serverTimestamp() });
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Save operation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', imageFile: null, imageUrl: '' });
    setEditingId(null);
    setUploadProgress(0);
  };

  const openEdit = (item) => {
    setFormData({ 
      name: item.name || '', 
      description: item.description || '', 
      price: item.price || '', 
      imageUrl: item.image || '',
      imageFile: null 
    });
    setEditingId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!user) return;
    if (window.confirm("Delete this asset permanently?")) {
      try {
        await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', activeTab, id));
      } catch (err) {
        console.error("Deletion failed:", err);
      }
    }
  };

  // --- 4. Render UI Logic ---
  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600 h-10 w-10 mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Initializing Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-100 transition-transform hover:scale-105">
              <Globe size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter">GLOBE TRAIL</h1>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-1">Management Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Active Session</span>
              <span className="text-sm font-bold text-slate-700">{user.email || 'Admin User'}</span>
            </div>
            <button 
              onClick={() => auth.signOut()}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Sign Out"
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">Master Content Dashboard</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Publish new destinations, manage pricing packages, and update imagery for the Globe Trail experience in real-time.
            </p>
          </div>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }}
            className="group w-full md:w-auto bg-blue-600 text-white pl-6 pr-8 py-5 rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition transform active:scale-95 shadow-2xl shadow-blue-200"
          >
            <div className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-90 transition-transform duration-300">
              <Plus size={20} />
            </div>
            NEW {activeTab.slice(0, -1).toUpperCase()}
          </button>
        </header>

        {/* Collection Selector */}
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit mb-12 border border-slate-200 shadow-inner">
          <button
            onClick={() => setActiveTab('destinations')}
            className={`flex items-center gap-2 px-10 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'destinations' ? 'bg-white text-blue-600 shadow-md scale-[1.02]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <MapPin size={18} /> Destinations
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2 px-10 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'packages' ? 'bg-white text-blue-600 shadow-md scale-[1.02]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Package size={18} /> Trip Packages
          </button>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-2xl hover:border-blue-100 transition-all duration-500">
              <div className="relative h-72 overflow-hidden bg-slate-100">
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt={item.name} 
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {item.price && (
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl font-black text-blue-600 shadow-2xl border border-blue-50">
                    ${item.price}
                  </div>
                )}
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Asset</span>
                </div>
                <h3 className="font-black text-2xl mb-3 text-slate-800 tracking-tight line-clamp-1">{item.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 flex-grow">{item.description}</p>
                <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                  <button onClick={() => openEdit(item)} className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
                    Modify Details <ChevronRight size={16}/>
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-4 text-red-400 hover:text-red-600 bg-red-50 rounded-2xl transition-all active:scale-90 shadow-sm hover:shadow-red-100">
                    <Trash2 size={20}/>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="col-span-full py-32 text-center border-4 border-dashed rounded-[48px] border-slate-200 bg-white/50">
              <div className="bg-slate-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Package size={48} />
              </div>
              <h3 className="text-slate-400 font-black text-2xl uppercase tracking-widest">Workspace Empty</h3>
              <p className="text-slate-300 font-medium mt-2 mb-8 text-lg">Your {activeTab} collection has no assets yet.</p>
              <button 
                onClick={() => setShowModal(true)} 
                className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition"
              >
                + Create first entry
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Media & Data Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-white">
            <div className="px-10 py-8 border-b flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{editingId ? 'Edit' : 'Create'} {activeTab.slice(0, -1)}</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Publish to Globe Trail Live</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 hover:bg-white rounded-full transition-all shadow-sm"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto">
              <div className="grid gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Display Name</label>
                  <input 
                    type="text" required
                    className="w-full px-8 py-5 bg-slate-100/50 rounded-3xl focus:ring-4 ring-blue-500/10 border-2 border-transparent focus:border-blue-500/20 outline-none font-bold text-lg transition-all"
                    value={formData.name}
                    placeholder="e.g. Kyoto Zen Gardens"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {activeTab === 'packages' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Market Price (USD)</label>
                    <div className="relative">
                      <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
                      <input 
                        type="number" required
                        className="w-full pl-14 pr-8 py-5 bg-slate-100/50 rounded-3xl focus:ring-4 ring-blue-500/10 border-2 border-transparent focus:border-blue-500/20 outline-none font-bold text-lg transition-all"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Public Description</label>
                  <textarea 
                    rows="4" required
                    className="w-full px-8 py-5 bg-slate-100/50 rounded-3xl focus:ring-4 ring-blue-500/10 border-2 border-transparent focus:border-blue-500/20 outline-none font-bold text-lg transition-all resize-none"
                    value={formData.description}
                    placeholder="Provide a compelling overview..."
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Visual Content</label>
                  <div className="relative group overflow-hidden rounded-[32px]">
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept="image/*"
                    />
                    <div className="w-full py-12 border-4 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center bg-slate-50 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                      <div className="bg-white p-5 rounded-2xl shadow-sm mb-4 text-blue-600 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <Upload size={32} />
                      </div>
                      <span className="text-xs text-slate-500 font-black uppercase tracking-widest">
                        {formData.imageFile ? formData.imageFile.name : 'Choose high-res media'}
                      </span>
                    </div>
                  </div>
                  
                  {uploadProgress > 0 && (
                    <div className="mt-6">
                      <div className="w-full bg-slate-100 rounded-full h-5 overflow-hidden p-1 border">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-300 flex items-center justify-center shadow-lg" style={{ width: `${uploadProgress}%` }}>
                          {uploadProgress > 25 && <span className="text-[8px] font-black text-white">{Math.round(uploadProgress)}%</span>}
                        </div>
                      </div>
                      <div className="flex justify-between mt-3">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Uploading to Cloud Storage</span>
                        {uploadProgress === 100 && <span className="text-[10px] font-black text-green-600 flex items-center gap-1 uppercase tracking-widest"><CheckCircle size={14}/> Verified</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || (uploadProgress > 0 && uploadProgress < 100)}
                className="w-full bg-blue-600 text-white py-6 rounded-[32px] font-black text-2xl hover:bg-blue-700 transition-all disabled:bg-slate-200 disabled:text-slate-400 shadow-2xl shadow-blue-200 flex items-center justify-center gap-4 active:scale-95"
              >
                {isSubmitting ? (
                  <> <Loader2 className="animate-spin h-8 w-8" /> PROCESSING... </>
                ) : (
                  editingId ? 'SAVE CHANGES' : 'PUBLISH LIVE'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      
      <footer className="text-center py-12 text-slate-300 text-[9px] font-black uppercase tracking-[0.5em]">
        Globe Trail CRM — Real-time Content Gateway — {appId}
      </footer>
    </div>
  );
}