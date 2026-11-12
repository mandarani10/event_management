import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Plus,
  Play,
  Pause,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Search,
  Bell,
  CheckCircle2,
  AlertCircle,
  Tag,
  Radio,
  Bookmark,
  Ticket,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Laptop,
  Mic2,
  Flame,
  Award,
  DollarSign,
  Star,
  Building2,
  Send,
  ThumbsUp,
  Trash2,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  Check,
  X,
  Filter
} from 'lucide-react';

// Default initial starter state (stored in localStorage so all user changes persist!)
const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'InnovateX: Annual Hackathon 2026',
    club: 'Computing Society',
    category: 'Technical',
    date: '2026-09-24',
    time: '09:00 AM - 08:00 PM',
    venue: 'Main Auditorium & Labs',
    registeredCount: 38,
    capacity: 100,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description: 'Flagship 24-hour campus hackathon bringing together students to solve real-world problems with AI and software.',
    status: 'Live Registration',
    budget: 1200,
    coordinator: 'Lora Piterson'
  },
  {
    id: 2,
    title: 'AuraFest: Inter-College Cultural Gala',
    club: 'Music & Arts Guild',
    category: 'Cultural',
    date: '2026-09-27',
    time: '05:30 PM - 11:00 PM',
    venue: 'Open Air Amphitheatre',
    registeredCount: 42,
    capacity: 250,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    description: 'An evening of live student bands, classical fusion, beatboxing, and dance performances.',
    status: 'Trending',
    budget: 2500,
    coordinator: 'Devon Vance'
  }
];

const INITIAL_CLUBS = [
  {
    id: 'c1',
    name: 'Computing Society',
    category: 'Technical',
    leads: 'Lora Piterson',
    members: 45,
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    description: 'Focusing on algorithms, open-source projects, web engineering, and competitive coding.',
    joined: true
  },
  {
    id: 'c2',
    name: 'Music & Arts Guild',
    category: 'Cultural',
    leads: 'Devon Vance',
    members: 62,
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    description: 'Promoting campus musicians, choir, theatrical productions, and acoustic jam sessions.',
    joined: false
  },
  {
    id: 'c3',
    name: 'Entrepreneurship Cell',
    category: 'Business',
    leads: 'Priya Sharma',
    members: 31,
    avatar: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
    description: 'Incubating startup ideas, alumni mentorship sessions, and founder workshops.',
    joined: false
  }
];

const INITIAL_VENUES = [
  {
    id: 'v1',
    name: 'Main Auditorium & Labs',
    type: 'Indoor Stage',
    capacity: 400,
    facilities: ['Dolby Audio', '4K Projector', 'Fiber LAN', 'Stage Lighting']
  },
  {
    id: 'v2',
    name: 'Open Air Amphitheatre',
    type: 'Outdoor Arena',
    capacity: 1200,
    facilities: ['Acoustic Shell', 'Festival Rigging', 'Spotlights', 'Green Rooms']
  },
  {
    id: 'v3',
    name: 'Seminar Hall 3',
    type: 'Conference Room',
    capacity: 150,
    facilities: ['Smart Podium', 'Dual Displays', 'Mic Array', 'AC']
  },
  {
    id: 'v4',
    name: 'Sports Complex Arena',
    type: 'Indoor Court',
    capacity: 600,
    facilities: ['PA Sound', 'High Power Outlets', 'Bleacher Seating']
  }
];

const INITIAL_CHECKLIST = [
  { id: 1, title: 'Sound check & mic sync', time: 'Sep 24, 08:30 AM', done: true },
  { id: 2, title: 'Guest speaker reception setup', time: 'Sep 24, 10:15 AM', done: false },
  { id: 3, title: 'Digital pass verification scanner check', time: 'Sep 24, 11:00 AM', done: false },
];

const INITIAL_BUDGET = [
  { id: 'b1', item: 'Audio-Visual Sound Rig Rental', club: 'Computing Society', amount: 450, category: 'Production', status: 'Approved' },
  { id: 'b2', item: 'Hackathon Prize Pool', club: 'Computing Society', amount: 600, category: 'Awards', status: 'Approved' },
  { id: 'b3', item: 'Stage Lighting & Backdrop', club: 'Music & Arts Guild', amount: 350, category: 'Production', status: 'Pending Review' }
];

const INITIAL_REVIEWS = [
  {
    id: 'r1',
    eventName: 'InnovateX: Annual Hackathon 2026',
    reviewer: 'Arjun Mehta',
    role: 'Student Attendee',
    rating: 5,
    date: 'Sep 24, 2026',
    comment: 'Great infrastructure and stable high-speed WiFi for all participant teams.',
    likes: 8,
    liked: false
  }
];

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // LocalStorage Persisted State
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('crextio_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [clubs, setClubs] = useState(() => {
    const saved = localStorage.getItem('crextio_clubs');
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [venues, setVenues] = useState(() => {
    const saved = localStorage.getItem('crextio_venues');
    return saved ? JSON.parse(saved) : INITIAL_VENUES;
  });

  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('crextio_checklist');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });

  const [budgetItems, setBudgetItems] = useState(() => {
    const saved = localStorage.getItem('crextio_budget');
    return saved ? JSON.parse(saved) : INITIAL_BUDGET;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('crextio_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const saved = localStorage.getItem('crextio_registered');
    return saved ? JSON.parse(saved) : [1];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('crextio_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('crextio_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('crextio_venues', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('crextio_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('crextio_budget', JSON.stringify(budgetItems));
  }, [budgetItems]);

  useEffect(() => {
    localStorage.setItem('crextio_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('crextio_registered', JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  // Timer State (Interactive stopwatch)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(155);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toast notifications
  const [notificationToast, setNotificationToast] = useState(null);
  const triggerToast = (title, message) => {
    setNotificationToast({ title, message });
    setTimeout(() => {
      setNotificationToast(null);
    }, 3500);
  };

  // Modals
  const [selectedEventModal, setSelectedEventModal] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddBudgetItemModal, setShowAddBudgetItemModal] = useState(false);

  // New Event Form State with Picture Upload
  const [newEvent, setNewEvent] = useState({
    title: '',
    club: 'Computing Society',
    category: 'Technical',
    date: '2026-09-24',
    time: '10:00 AM - 04:00 PM',
    venue: 'Main Auditorium & Labs',
    capacity: 100,
    budget: 500,
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  // Handle Image File Upload (Base64 conversion)
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewEvent((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Create Event Form Submit
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    const fallbackImg =
      newEvent.category === 'Technical'
        ? 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
        : newEvent.category === 'Cultural'
        ? 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=80';

    const created = {
      id: Date.now(),
      title: newEvent.title.trim(),
      club: newEvent.club,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      venue: newEvent.venue,
      registeredCount: 1,
      capacity: Number(newEvent.capacity) || 100,
      image: imagePreview || fallbackImg,
      description: newEvent.description.trim() || 'Join us for this campus event!',
      status: 'Live Registration',
      budget: Number(newEvent.budget) || 0,
      coordinator: 'Nixtio (You)'
    };

    setEvents([created, ...events]);

    // Also add to budget ledger if budget specified
    if (created.budget > 0) {
      setBudgetItems((prev) => [
        {
          id: `b-${Date.now()}`,
          item: `${created.title} - Operational Budget`,
          club: created.club,
          amount: created.budget,
          category: 'Event Grant',
          status: 'Pending Review'
        },
        ...prev
      ]);
    }

    // Reset Form
    setNewEvent({
      title: '',
      club: clubs[0]?.name || 'Computing Society',
      category: 'Technical',
      date: '2026-09-24',
      time: '10:00 AM - 04:00 PM',
      venue: venues[0]?.name || 'Main Auditorium & Labs',
      capacity: 100,
      budget: 500,
      description: '',
      image: ''
    });
    setImagePreview('');
    setShowCreateModal(false);
    triggerToast('Event Published Successfully 🎉', `${created.title} is now open for registration!`);
  };

  // RSVP Booking toggle
  const toggleRegistration = (id) => {
    const isAlready = registeredEvents.includes(id);
    if (isAlready) {
      setRegisteredEvents(registeredEvents.filter((item) => item !== id));
      setEvents(
        events.map((ev) =>
          ev.id === id ? { ...ev, registeredCount: Math.max(0, ev.registeredCount - 1) } : ev
        )
      );
      triggerToast('Registration Cancelled', 'You have withdrawn your RSVP.');
    } else {
      setRegisteredEvents([...registeredEvents, id]);
      setEvents(
        events.map((ev) =>
          ev.id === id ? { ...ev, registeredCount: ev.registeredCount + 1 } : ev
        )
      );
      triggerToast('RSVP Confirmed 🎉', 'Your digital entry pass is now generated.');
    }
  };

  // Delete event
  const handleDeleteEvent = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setEvents(events.filter((ev) => ev.id !== id));
      setRegisteredEvents(registeredEvents.filter((item) => item !== id));
      if (selectedEventModal?.id === id) setSelectedEventModal(null);
      triggerToast('Event Removed', `Deleted "${title}".`);
    }
  };

  // Checklist Actions
  const [newChecklistText, setNewChecklistText] = useState('');
  const handleAddChecklist = (e) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    const item = {
      id: Date.now(),
      title: newChecklistText.trim(),
      time: 'Today',
      done: false
    };
    setChecklist([...checklist, item]);
    setNewChecklistText('');
  };

  const toggleChecklistItem = (id) => {
    setChecklist(
      checklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
    );
  };

  const deleteChecklistItem = (id) => {
    setChecklist(checklist.filter((c) => c.id !== id));
  };

  // Club Membership Toggle
  const toggleClubMembership = (id) => {
    setClubs(
      clubs.map((c) => {
        if (c.id === id) {
          const nextJoined = !c.joined;
          triggerToast(
            nextJoined ? 'Welcome to the Club!' : 'Left Club',
            nextJoined ? `You joined ${c.name}` : `You left ${c.name}`
          );
          return {
            ...c,
            joined: nextJoined,
            members: nextJoined ? c.members + 1 : c.members - 1
          };
        }
        return c;
      })
    );
  };

  // Budget Actions
  const [newBudgetItem, setNewBudgetItem] = useState({
    item: '',
    club: clubs[0]?.name || 'Computing Society',
    amount: 100,
    category: 'Production'
  });

  const handleAddBudgetSubmit = (e) => {
    e.preventDefault();
    if (!newBudgetItem.item.trim()) return;
    const entry = {
      id: `b-${Date.now()}`,
      item: newBudgetItem.item.trim(),
      club: newBudgetItem.club,
      amount: Number(newBudgetItem.amount) || 0,
      category: newBudgetItem.category,
      status: 'Pending Review'
    };
    setBudgetItems([entry, ...budgetItems]);
    setShowAddBudgetItemModal(false);
    setNewBudgetItem({
      item: '',
      club: clubs[0]?.name || 'Computing Society',
      amount: 100,
      category: 'Production'
    });
    triggerToast('Budget Request Logged', 'Awaiting approval.');
  };

  const approveBudgetItem = (id) => {
    setBudgetItems(
      budgetItems.map((b) => (b.id === id ? { ...b, status: 'Approved' } : b))
    );
    triggerToast('Expense Approved', 'Funds have been disbursed.');
  };

  // Reviews
  const [newReviewForm, setNewReviewForm] = useState({
    eventName: events[0]?.title || '',
    reviewer: 'Nixtio',
    rating: 5,
    comment: ''
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewForm.comment.trim()) return;
    const newRev = {
      id: `r-${Date.now()}`,
      eventName: newReviewForm.eventName || events[0]?.title,
      reviewer: newReviewForm.reviewer.trim() || 'Campus Student',
      role: 'Student Attendee',
      rating: Number(newReviewForm.rating),
      date: 'Today',
      comment: newReviewForm.comment.trim(),
      likes: 0,
      liked: false
    };
    setReviews([newRev, ...reviews]);
    setNewReviewForm({ ...newReviewForm, comment: '' });
    triggerToast('Feedback Published', 'Thank you for rating campus events!');
  };

  const toggleReviewLike = (id) => {
    setReviews(
      reviews.map((r) =>
        r.id === id
          ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
  };

  // Calendar State
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('2026-09-24');

  // Filtered Events
  const filteredEvents = events.filter((ev) => {
    const matchCat = filterCategory === 'All' || ev.category === filterCategory;
    const matchSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Dynamic real calculations
  const totalRegisteredCount = events.reduce((acc, ev) => acc + (ev.registeredCount || 0), 0);
  const totalCapacity = events.reduce((acc, ev) => acc + (ev.capacity || 0), 1);
  const registrationPercentage = Math.min(100, Math.round((totalRegisteredCount / totalCapacity) * 100));

  const totalClubMembers = clubs.reduce((acc, c) => acc + (c.members || 0), 0);
  const totalApprovedBudget = budgetItems
    .filter((b) => b.status === 'Approved')
    .reduce((acc, b) => acc + b.amount, 0);

  const doneChecklistCount = checklist.filter((c) => c.done).length;
  const checklistPercentage = checklist.length
    ? Math.round((doneChecklistCount / checklist.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#f1f0ea] p-2 sm:p-5 lg:p-8 flex items-center justify-center font-sans antialiased selection:bg-amber-300 selection:text-black">
      
      {/* Toast Notification Alert */}
      {notificationToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#1b1916] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-[#ffea79]" />
          <div>
            <div className="text-xs font-semibold">{notificationToast.title}</div>
            <div className="text-[11px] text-white/70">{notificationToast.message}</div>
          </div>
        </div>
      )}

      {/* Main Canvas Shell Container */}
      <div className="w-full max-w-[1440px] bg-[#fbf9f4] rounded-[42px] p-5 sm:p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06),0_0_1px_1px_rgba(0,0,0,0.03)] border border-[#edeae1] relative overflow-hidden transition-all duration-300">
        
        {/* Soft yellow ambient glow in top-right corner */}
        <div className="absolute top-0 right-0 w-[580px] h-[520px] bg-gradient-to-bl from-[#fef3be]/60 via-[#fff8d4]/30 to-transparent pointer-events-none rounded-bl-full blur-2xl" />

        {/* TOP NAVIGATION BAR */}
        <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Logo Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('Dashboard')}
              className="px-7 py-2.5 bg-[#f5f3ec] border border-[#e4e0d4] rounded-full text-[17px] font-medium tracking-tight text-[#1c1a17] shadow-xs hover:border-black transition cursor-pointer flex items-center gap-2"
            >
              <span className="font-semibold text-lg tracking-tight">Crextio</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-medium">Campus</span>
            </button>
          </div>

          {/* Navigation Pill Menu (Dashboard, Events, Clubs, Venues, Budget, Calendar, Reviews) */}
          <nav className="flex items-center bg-[#f4f2ea]/80 backdrop-blur-md p-1.5 rounded-full border border-[#e5e1d5] text-sm font-medium overflow-x-auto max-w-full">
            {['Dashboard', 'Events', 'Clubs', 'Venues', 'Budget', 'Calendar', 'Reviews'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1e1e1e] text-white shadow-sm font-medium'
                      : 'text-[#68645e] hover:text-[#1e1e1e] hover:bg-[#eae6db]/60'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>

          {/* Host Event Button & Notification bell */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ffea79] hover:bg-[#ffe55b] text-[#1f1d17] font-semibold text-sm transition shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Host Event</span>
            </button>
            <button
              onClick={() => triggerToast('System Status', `${events.length} active events on campus.`)}
              className="w-10 h-10 rounded-full bg-[#f4f2ea] border border-[#e5e1d5] flex items-center justify-center cursor-pointer hover:bg-white transition text-[#403e39]"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'Dashboard' && (
          <div className="animate-in fade-in duration-200">
            {/* HERO TITLE & STATS ROW */}
            <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8">
              <div className="lg:col-span-8">
                <h1 className="text-3xl md:text-5xl font-normal text-[#1a1917] tracking-tight font-serif mb-6">
                  Welcome in, <span className="font-semibold text-black">Nixtio</span>
                </h1>

                {/* Event Lifecycle Metrics segmented pill bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#5c5952]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#2b2a26] font-semibold text-sm">Registrations</span>
                    <span className="px-4 py-2 rounded-full bg-[#242424] text-white text-xs font-medium shadow-xs">
                      {registrationPercentage}% live
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2b2a26] font-semibold text-sm">Hired/Active</span>
                    <span className="px-4 py-2 rounded-full bg-[#ffea79] text-[#2b2600] text-xs font-semibold shadow-xs">
                      {registeredEvents.length} Events
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2b2a26] font-semibold text-sm">Project time</span>
                    {/* Striped progress bar matching image */}
                    <div className="h-8 w-44 rounded-full border border-[#ded9cb] overflow-hidden p-0.5 bg-white/60 flex items-center">
                      <div
                        className="h-full rounded-full w-[60%] flex items-center justify-center text-[10px] text-amber-950 font-medium"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(45deg, #ded9cb, #ded9cb 4px, #f2efe7 4px, #f2efe7 8px)'
                        }}
                      />
                      <span className="ml-2 text-xs text-[#6e6a62]">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2b2a26] font-semibold text-sm">Output</span>
                    <span className="px-4 py-2 rounded-full border border-[#ded9cb] bg-white/70 text-[#2b2a26] text-xs">
                      {checklistPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right quick counter widgets */}
              <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-8 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#ded9cb] flex items-center justify-center bg-white/50 text-[#4c4943]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-4xl font-light text-[#1b1916] leading-none">{totalRegisteredCount}</div>
                    <div className="text-xs text-[#7d7970] font-medium tracking-wide">Attendees Active</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#ded9cb] flex items-center justify-center bg-white/50 text-[#4c4943]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-4xl font-light text-[#1b1916] leading-none">{clubs.length}</div>
                    <div className="text-xs text-[#7d7970] font-medium tracking-wide">Clubs & Societies</div>
                  </div>
                </div>
              </div>
            </section>

            {/* MAIN BENTO GRID SECTION */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 mb-7">
              
              {/* Card 1: Lead Organizer Profile Card */}
              <div className="lg:col-span-3 rounded-[32px] overflow-hidden relative shadow-sm border border-[#e5e1d5] group flex flex-col justify-end min-h-[340px] bg-[#222]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Student Lead"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                <div className="relative z-10 p-5 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">Lora Piterson</h3>
                    <p className="text-xs text-white/70">UX/UI Designer & Lead</p>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full w-fit">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                      <span>Student Council Lead</span>
                    </div>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium text-white shadow-sm">
                    ${totalApprovedBudget}
                  </div>
                </div>
              </div>

              {/* Card 2: Event Progress Chart Card (6.1h Work Time) */}
              <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-[32px] p-6 border border-[#ece7dc] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-[#1c1a17]">Progress</span>
                  <button
                    onClick={() => setActiveTab('Calendar')}
                    className="w-8 h-8 rounded-full border border-[#e7e3d8] flex items-center justify-center text-[#555] hover:bg-[#f6f4ee] transition cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="my-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-normal text-[#1a1917]">6.1 h</span>
                    <span className="text-xs text-[#7e7a72] leading-tight">Work Time<br />this week</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-end justify-between h-28 px-1 pb-1">
                    {[
                      { day: 'S', height: '25%', active: false },
                      { day: 'M', height: '80%', active: true, barColor: 'bg-[#1b1916]' },
                      { day: 'T', height: '55%', active: true, barColor: 'bg-[#1b1916]' },
                      { day: 'W', height: '40%', active: true, barColor: 'bg-[#1b1916]' },
                      { day: 'T', height: '70%', active: true, barColor: 'bg-[#1b1916]' },
                      { day: 'F', height: '90%', active: true, barColor: 'bg-[#ffea79]', badge: '5h 23m' },
                      { day: 'S', height: '20%', active: false },
                    ].map((col, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 group relative">
                        {col.badge && (
                          <span className="absolute -top-7 text-[10px] font-semibold bg-[#ffea79] text-[#332b00] px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                            {col.badge}
                          </span>
                        )}
                        <div className="w-2.5 h-20 bg-[#efece4] rounded-full flex flex-col justify-end overflow-hidden">
                          <div
                            className={`w-full rounded-full transition-all duration-300 ${
                              col.barColor || 'bg-[#dedbd2]'
                            }`}
                            style={{ height: col.height }}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-[#8c8880]">{col.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Interactive Stopwatch Timer */}
              <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-[32px] p-6 border border-[#ece7dc] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-[#1c1a17]">Time tracker</span>
                  <button
                    onClick={() => setTimerSeconds(0)}
                    className="w-8 h-8 rounded-full border border-[#e7e3d8] flex items-center justify-center text-[#555] hover:bg-[#f6f4ee] transition cursor-pointer"
                    title="Reset to 00:00"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="my-auto py-2 flex flex-col items-center justify-center relative">
                  <div className="w-36 h-36 rounded-full border-4 border-[#efece4] border-t-amber-400 border-r-amber-400 flex flex-col items-center justify-center shadow-inner relative">
                    <div className="absolute inset-1 rounded-full border border-dashed border-[#ddd8cc] pointer-events-none" />
                    <span className="text-3xl font-normal text-[#1a1917] tracking-tight">
                      {formatTimer(timerSeconds)}
                    </span>
                    <span className="text-[11px] text-[#858178] mt-0.5 font-medium">Work Time</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`w-10 h-10 rounded-full border border-[#e7e3d8] flex items-center justify-center transition cursor-pointer shadow-xs ${
                      isTimerRunning ? 'bg-[#ffea79] text-black' : 'bg-white text-[#2b2925] hover:bg-[#f5f2ea]'
                    }`}
                    title={isTimerRunning ? 'Pause' : 'Start'}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button
                    onClick={() => setTimerSeconds(155)}
                    className="w-10 h-10 rounded-full bg-[#1e1e1e] text-white flex items-center justify-center hover:bg-black shadow-xs transition cursor-pointer"
                    title="Reset to 02:35 default"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 4: Right Dark Onboarding & Checklist Sidebar */}
              <div className="lg:col-span-3 rounded-[32px] p-6 bg-gradient-to-br from-[#2a2b30] to-[#1a1b1f] text-white shadow-md border border-[#373942] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-medium text-white/90">Onboarding</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80">
                      {checklistPercentage}%
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ffea79] text-[#2c2600]">
                      Task
                    </span>
                  </div>

                  <div className="space-y-2.5 mt-4 max-h-56 overflow-y-auto pr-1">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-between text-xs group"
                      >
                        <div
                          onClick={() => toggleChecklistItem(item.id)}
                          className="flex-1 cursor-pointer"
                        >
                          <div className={`font-medium ${item.done ? 'line-through text-white/40' : 'text-white'}`}>
                            {item.title}
                          </div>
                          <div className="text-[10px] text-white/40 mt-0.5">{item.time}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleChecklistItem(item.id)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition cursor-pointer ${
                              item.done ? 'bg-[#ffea79] text-black' : 'border border-white/30 text-transparent'
                            }`}
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => deleteChecklistItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-rose-400 transition cursor-pointer p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Add Checklist Input */}
                  <form onSubmit={handleAddChecklist} className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add task..."
                      value={newChecklistText}
                      onChange={(e) => setNewChecklistText(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-[#ffea79] text-black font-semibold text-xs cursor-pointer hover:bg-amber-300"
                    >
                      +
                    </button>
                  </form>
                </div>

                <button
                  onClick={() => setActiveTab('Events')}
                  className="mt-4 w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition text-center border border-white/10 cursor-pointer"
                >
                  View All Campus Events
                </button>
              </div>
            </div>

            {/* BOTTOM SECTION: CALENDAR TIMELINE & EXPLORE EVENTS */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left mini widgets: Devices & Approvals */}
              <div className="lg:col-span-3 space-y-4">
                <div
                  onClick={() => setActiveTab('Budget')}
                  className="bg-white/80 backdrop-blur-sm rounded-[24px] p-4 border border-[#ece7dc] shadow-xs flex items-center justify-between cursor-pointer hover:bg-white transition"
                >
                  <span className="text-sm font-medium text-[#292723]">Pension & Budget allocations</span>
                  <ChevronDown className="w-4 h-4 text-[#777]" />
                </div>

                {/* Allocated Gear / Devices Widget */}
                <div className="bg-white/80 backdrop-blur-sm rounded-[28px] p-5 border border-[#ece7dc] shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-[#1c1a17]">Devices</span>
                    <ChevronUp className="w-4 h-4 text-[#777]" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-2xl bg-[#f9f8f4] border border-[#eee9dc]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                          <Laptop className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1d1b18]">MacBook Air</div>
                          <div className="text-[10px] text-[#827e75]">Version M1</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Online</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-2xl bg-[#f9f8f4] border border-[#eee9dc]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
                          <Mic2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1d1b18]">Audio Desk PA</div>
                          <div className="text-[10px] text-[#827e75]">Console Unit 2</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar & Upcoming Events Feed */}
              <div className="lg:col-span-9 bg-white/80 backdrop-blur-sm rounded-[32px] p-6 border border-[#ece7dc] shadow-xs">
                
                {/* Header with Search and Month Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#efece3]">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8a867c] font-semibold">Campus Calendar</span>
                    <h2 className="text-xl font-semibold text-[#1b1916]">September 2024 - 2026</h2>
                  </div>

                  {/* Search bar inside pill */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b877f]" />
                      <input
                        type="text"
                        placeholder="Search event or club..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-[#f6f4ed] rounded-full text-xs text-[#2b2a26] border border-[#e5e1d5] focus:outline-none focus:border-black w-48 sm:w-60"
                      />
                    </div>

                    {/* Filter tags */}
                    <div className="flex items-center bg-[#f4f1e8] p-1 rounded-full border border-[#e4e0d4] text-xs">
                      {['All', 'Technical', 'Cultural', 'Business'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFilterCategory(cat)}
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                            filterCategory === cat
                              ? 'bg-[#1e1e1e] text-white shadow-xs'
                              : 'text-[#69655e] hover:text-black'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calendar Days Row Header */}
                <div className="grid grid-cols-6 gap-2 my-5 text-center text-xs">
                  {[
                    { day: 'Mon', num: 22 },
                    { day: 'Tue', num: 23 },
                    { day: 'Wed', num: 24, active: true },
                    { day: 'Thu', num: 25 },
                    { day: 'Fri', num: 26 },
                    { day: 'Sat', num: 27 },
                  ].map((d, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedCalendarDate(`2026-09-${d.num}`);
                        setActiveTab('Calendar');
                      }}
                      className={`p-2.5 rounded-2xl border transition cursor-pointer ${
                        d.active
                          ? 'bg-[#1f1e1b] text-white border-black shadow-sm'
                          : 'bg-[#faf8f2] border-[#edeae1] text-[#555] hover:bg-white'
                      }`}
                    >
                      <div className={`text-[10px] ${d.active ? 'text-white/70' : 'text-[#87837a]'}`}>{d.day}</div>
                      <div className="text-base font-semibold mt-0.5">{d.num}</div>
                    </div>
                  ))}
                </div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEvents.slice(0, 2).map((ev) => {
                    const isReg = registeredEvents.includes(ev.id);
                    const percent = Math.min(100, Math.round((ev.registeredCount / ev.capacity) * 100));

                    return (
                      <div
                        key={ev.id}
                        className="group bg-[#fcfbf7] rounded-[24px] p-4 border border-[#ece8dd] hover:border-[#1e1e1e] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-3 bg-[#e8e4d8]">
                            <img
                              src={ev.image}
                              alt={ev.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium text-white flex items-center gap-1">
                              <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
                              <span>{ev.status}</span>
                            </div>
                            <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[11px] font-semibold text-[#1e1e1e]">
                              {ev.category}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-[#7d7970] font-medium mb-1">
                            <span className="text-[#1a1917] font-semibold">{ev.club}</span>
                            <span>•</span>
                            <span>{ev.venue}</span>
                          </div>

                          <h3 className="text-base font-semibold text-[#1a1917] tracking-tight group-hover:text-black line-clamp-1">
                            {ev.title}
                          </h3>

                          <p className="text-xs text-[#6e6a62] mt-1 line-clamp-2 leading-relaxed">
                            {ev.description}
                          </p>

                          <div className="mt-3 flex items-center gap-3 text-xs text-[#524f48]">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-3.5 h-3.5 text-[#868278]" />
                              <span>{ev.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#868278]" />
                              <span>{ev.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#ede9de] flex items-center justify-between">
                          <div>
                            <div className="text-[11px] text-[#736f66] font-medium">
                              <span className="font-semibold text-black">{ev.registeredCount}</span> / {ev.capacity} spots
                            </div>
                            <div className="w-24 h-1.5 bg-[#ede9de] rounded-full overflow-hidden mt-1">
                              <div
                                className="h-full bg-amber-400 rounded-full"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedEventModal(ev)}
                              className="px-3 py-1.5 rounded-full border border-[#ded9cb] hover:bg-white text-xs font-medium text-[#3b3934] transition cursor-pointer"
                            >
                              Details
                            </button>

                            <button
                              onClick={() => toggleRegistration(ev.id)}
                              className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                                isReg
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#1b1916] text-white hover:bg-black'
                              }`}
                            >
                              {isReg ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Booked</span>
                                </>
                              ) : (
                                <>
                                  <Ticket className="w-3.5 h-3.5" />
                                  <span>RSVP</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EVENTS (ALL EVENTS DIRECTORY) */}
        {/* ========================================================================= */}
        {activeTab === 'Events' && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8a867c] font-semibold">Campus Catalog</span>
                <h1 className="text-3xl font-serif text-[#1b1916]">All College Events & Hackathons</h1>
                <p className="text-xs text-[#736e65] mt-1">
                  Browse, manage, host, and register for real college events with live capacity tracking.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b877f]" />
                  <input
                    type="text"
                    placeholder="Search by name, venue, or club..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white rounded-full text-xs text-[#2b2a26] border border-[#e5e1d5] focus:outline-none focus:border-black w-64"
                  />
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-5 py-2 rounded-full bg-[#1b1916] text-white hover:bg-black text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Host New Event</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {['All', 'Technical', 'Cultural', 'Business'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition ${
                    filterCategory === cat
                      ? 'bg-[#1e1e1e] text-white shadow-sm'
                      : 'bg-[#f4f1e8] text-[#69655e] hover:bg-[#ede8db]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div className="bg-white/60 rounded-3xl p-12 text-center border border-[#ece7dc]">
                <p className="text-sm text-[#777]">No events found matching your search.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 px-5 py-2 rounded-full bg-[#ffea79] text-black text-xs font-semibold cursor-pointer"
                >
                  Host First Event
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((ev) => {
                  const isReg = registeredEvents.includes(ev.id);
                  const percent = Math.min(100, Math.round((ev.registeredCount / ev.capacity) * 100));

                  return (
                    <div
                      key={ev.id}
                      className="bg-white/80 rounded-[30px] p-5 border border-[#ece7dc] hover:border-[#1e1e1e] hover:shadow-lg transition flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-[#ece7db]">
                          <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                          <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full font-medium">
                            {ev.status}
                          </span>
                          <span className="absolute top-3 right-3 bg-[#ffea79] text-[#2b2500] text-[11px] px-3 py-1 rounded-full font-semibold">
                            {ev.category}
                          </span>
                        </div>

                        <div className="text-[11px] font-medium text-[#7d7970] mb-1">
                          {ev.club} • <span className="text-[#1a1917]">{ev.venue}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1b1916] line-clamp-1">{ev.title}</h3>
                        <p className="text-xs text-[#6e6a62] mt-2 line-clamp-2 leading-relaxed">
                          {ev.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-[#ede9de] flex items-center justify-between text-xs text-[#524f48]">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5 text-[#888]" />
                            {ev.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#888]" />
                            {ev.time}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#ede9de] flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-[#736f66]">
                            <span className="font-semibold text-black">{ev.registeredCount}</span> / {ev.capacity} booked
                          </div>
                          <div className="w-24 h-1.5 bg-[#ede9de] rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedEventModal(ev)}
                            className="px-3 py-1.5 rounded-full border border-[#ded9cb] hover:bg-[#f6f4ee] text-xs font-medium text-[#3b3934] transition cursor-pointer"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => toggleRegistration(ev.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                              isReg
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#1b1916] text-white hover:bg-black'
                            }`}
                          >
                            {isReg ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ticket className="w-3.5 h-3.5" />}
                            <span>{isReg ? 'Booked' : 'RSVP'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteEvent(ev.id, ev.title)}
                            className="w-8 h-8 rounded-full border border-[#ded9cb] flex items-center justify-center text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CLUBS & STUDENT SOCIETIES */}
        {/* ========================================================================= */}
        {activeTab === 'Clubs' && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8a867c] font-semibold">Campus Communities</span>
                <h1 className="text-3xl font-serif text-[#1b1916]">Clubs & Technical Societies</h1>
                <p className="text-xs text-[#736e65] mt-1">
                  Connect with active student chapters, attend internal sessions, or join organizing committees.
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-semibold text-[#1a1917]">{clubs.length} Active Chapters</div>
                <div className="text-[11px] text-[#78746c]">{totalClubMembers} Active Members</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((c) => (
                <div
                  key={c.id}
                  className="bg-white/80 rounded-[32px] p-6 border border-[#ece7dc] hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-2xl object-cover border border-[#ded9cb]" />
                      <div>
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                          {c.category}
                        </span>
                        <h3 className="text-base font-semibold text-[#1b1916] mt-1">{c.name}</h3>
                        <p className="text-[11px] text-[#7d7970]">Coordinator: {c.leads}</p>
                      </div>
                    </div>

                    <p className="text-xs text-[#6e6a62] leading-relaxed mb-4">
                      {c.description}
                    </p>

                    <div className="p-3 rounded-2xl bg-[#faf8f2] border border-[#eee9dc] text-center mb-4">
                      <div className="text-xs font-semibold text-[#1a1917]">{c.members}</div>
                      <div className="text-[10px] text-[#868278]">Registered Student Members</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#ede9de] flex items-center justify-between">
                    <button
                      onClick={() => {
                        setFilterCategory(c.category);
                        setActiveTab('Events');
                      }}
                      className="text-xs font-medium text-[#4f4c45] hover:text-black flex items-center gap-1 cursor-pointer"
                    >
                      <span>Events Hosted</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleClubMembership(c.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                        c.joined
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                          : 'bg-[#ffea79] hover:bg-[#ffe55b] text-[#242000]'
                      }`}
                    >
                      {c.joined ? 'Member ✓ (Leave)' : 'Join Society'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: VENUES & AUDITORIUMS */}
        {/* ========================================================================= */}
        {activeTab === 'Venues' && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8a867c] font-semibold">Campus Infrastructure</span>
                <h1 className="text-3xl font-serif text-[#1b1916]">Auditoriums & Event Venues</h1>
                <p className="text-xs text-[#736e65] mt-1">
                  Inspect facilities, check capacity limits, and directly reserve campus venues for approved student events.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800">
                  {venues.length} Managed Campus Spaces
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {venues.map((v) => {
                // Find if an event is booked here
                const bookedEvent = events.find((e) => e.venue === v.name);

                return (
                  <div
                    key={v.id}
                    className="bg-white/80 rounded-[32px] p-6 border border-[#ece7dc] hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-[#1b1916]">{v.name}</h3>
                        <span
                          className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                            bookedEvent
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {bookedEvent ? 'Booked' : 'Available'}
                        </span>
                      </div>

                      <div className="text-xs text-[#7c7870] mb-3">
                        {v.type} • <span className="font-semibold text-black">Capacity: {v.capacity} seats</span>
                      </div>

                      {bookedEvent ? (
                        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/60 mb-4 text-xs">
                          <span className="text-amber-800 font-medium">Scheduled for: </span>
                          <span className="font-bold text-black">{bookedEvent.title}</span> ({bookedEvent.date})
                        </div>
                      ) : (
                        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/60 mb-4 text-xs text-emerald-800">
                          Ready for booking and stage allocations.
                        </div>
                      )}

                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#8b877e] font-semibold">
                          Facilities Included:
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {v.facilities.map((fac, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2.5 py-1 rounded-full bg-[#faf7f0] border border-[#eae5d8] text-[#4f4d47]"
                            >
                              ✓ {fac}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#ede9de] flex items-center justify-between">
                      <button
                        onClick={() => triggerToast('Availability Checked', `${v.name} status is up-to-date.`)}
                        className="text-xs font-medium text-[#4c4943] hover:text-black cursor-pointer"
                      >
                        Check Specs
                      </button>

                      <button
                        onClick={() => {
                          setNewEvent((prev) => ({ ...prev, venue: v.name }));
                          setShowCreateModal(true);
                        }}
                        className="px-5 py-2 rounded-full bg-[#1b1916] hover:bg-black text-white text-xs font-semibold cursor-pointer"
                      >
                        Host Event Here
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BUDGET & EXPENDITURE */}
        {/* ========================================================================= */}
        {activeTab === 'Budget' && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8a867c] font-semibold">Student Council Treasury</span>
                <h1 className="text-3xl font-serif text-[#1b1916]">Event Budget & Expenses</h1>
                <p className="text-xs text-[#736e65] mt-1">
                  Itemized ledger for college allocations, stage rentals, sound equipment, and prizes.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddBudgetItemModal(true)}
                  className="px-5 py-2.5 rounded-full bg-[#ffea79] text-[#201d16] font-semibold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-amber-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Request Budget</span>
                </button>
              </div>
            </div>

            {/* Treasury KPI Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/80 p-5 rounded-3xl border border-[#ece7dc] shadow-xs">
                <div className="text-xs text-[#807c74]">Total Approved Spend</div>
                <div className="text-2xl font-bold text-emerald-700 mt-1">${totalApprovedBudget}</div>
              </div>
              <div className="bg-white/80 p-5 rounded-3xl border border-[#ece7dc] shadow-xs">
                <div className="text-xs text-[#807c74]">Pending Requests</div>
                <div className="text-2xl font-bold text-amber-700 mt-1">
                  ${budgetItems.filter((b) => b.status === 'Pending Review').reduce((acc, b) => acc + b.amount, 0)}
                </div>
              </div>
              <div className="bg-white/80 p-5 rounded-3xl border border-[#ece7dc] shadow-xs">
                <div className="text-xs text-[#807c74]">Recorded Transactions</div>
                <div className="text-2xl font-bold text-[#1b1916] mt-1">{budgetItems.length}</div>
              </div>
            </div>

            {/* Ledger Table */}
            <div className="bg-white/80 rounded-[32px] p-6 border border-[#ece7dc] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[#88837a] border-b border-[#f1eee6]">
                      <th className="py-3 px-4 font-semibold">Expense Item</th>
                      <th className="py-3 px-4 font-semibold">Club / Society</th>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Amount</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f2eb]">
                    {budgetItems.map((b) => (
                      <tr key={b.id} className="hover:bg-[#faf8f2] transition">
                        <td className="py-3 px-4 font-medium text-[#1c1a17]">{b.item}</td>
                        <td className="py-3 px-4 text-[#5f5c55]">{b.club}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#f4f1e8] text-[#555] font-medium text-[11px]">
                            {b.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#1b1916]">${b.amount}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                              b.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {b.status === 'Pending Review' ? (
                            <button
                              onClick={() => approveBudgetItem(b.id)}
                              className="px-3 py-1 rounded-full bg-[#1b1916] hover:bg-black text-white text-[11px] font-medium transition cursor-pointer"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-700 font-medium">Cleared ✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CALENDAR */}
        {/* ========================================================================= */}
        {activeTab === 'Calendar' && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8a867c] font-semibold">Semester Schedule</span>
                <h1 className="text-3xl font-serif text-[#1b1916]">Academic & Event Calendar</h1>
                <p className="text-xs text-[#736e65] mt-1">
                  View scheduled dates, time slots, and registrations across days.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCalendarDate('2026-09-24')}
                  className="px-4 py-1.5 rounded-full bg-[#1b1916] text-white text-xs font-semibold cursor-pointer"
                >
                  Jump to Hackathon Day
                </button>
              </div>
            </div>

            {/* Date Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
              {[
                { dateStr: '2026-09-22', day: 'Mon', num: 22 },
                { dateStr: '2026-09-23', day: 'Tue', num: 23 },
                { dateStr: '2026-09-24', day: 'Wed', num: 24 },
                { dateStr: '2026-09-25', day: 'Thu', num: 25 },
                { dateStr: '2026-09-26', day: 'Fri', num: 26 },
                { dateStr: '2026-09-27', day: 'Sat', num: 27 },
                { dateStr: '2026-09-28', day: 'Sun', num: 28 },
              ].map((item) => {
                const isSelected = selectedCalendarDate === item.dateStr;
                const eventsOnDate = events.filter((e) => e.date === item.dateStr);

                return (
                  <div
                    key={item.dateStr}
                    onClick={() => setSelectedCalendarDate(item.dateStr)}
                    className={`p-4 rounded-3xl border text-center transition cursor-pointer flex flex-col justify-between h-28 ${
                      isSelected
                        ? 'bg-[#1e1e1e] text-white border-black shadow-md'
                        : 'bg-white/80 border-[#edeae1] text-[#4f4c45] hover:bg-white'
                    }`}
                  >
                    <div className={`text-xs ${isSelected ? 'text-white/70' : 'text-[#87837a]'}`}>{item.day}</div>
                    <div className="text-2xl font-semibold">{item.num}</div>
                    <div className="text-[10px]">
                      {eventsOnDate.length > 0 ? (
                        <span className={`px-2 py-0.5 rounded-full ${isSelected ? 'bg-amber-300 text-black font-semibold' : 'bg-amber-100 text-amber-900 font-medium'}`}>
                          {eventsOnDate.length} {eventsOnDate.length === 1 ? 'Event' : 'Events'}
                        </span>
                      ) : (
                        <span className="opacity-40">No event</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Date Schedule */}
            <div className="bg-white/80 rounded-[32px] p-6 border border-[#ece7dc] shadow-xs">
              <h3 className="text-base font-semibold text-[#1c1a17] mb-4">
                Schedule for {selectedCalendarDate}
              </h3>

              {(() => {
                const dayEvents = events.filter((e) => e.date === selectedCalendarDate);
                if (dayEvents.length === 0) {
                  return (
                    <div className="p-8 text-center bg-[#faf8f2] rounded-2xl border border-[#ede9dc]">
                      <p className="text-xs text-[#7a766e]">No events scheduled for this day yet.</p>
                      <button
                        onClick={() => {
                          setNewEvent((prev) => ({ ...prev, date: selectedCalendarDate }));
                          setShowCreateModal(true);
                        }}
                        className="mt-3 px-4 py-1.5 rounded-full bg-[#1b1916] text-white text-xs font-medium cursor-pointer"
                      >
                        Schedule Event on this Day
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-4 rounded-2xl bg-[#f9f8f3] border border-[#ede9dc] flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-20 text-center">
                            <span className="text-xs font-bold text-[#1a1917] block">{ev.time.split('-')[0]}</span>
                            <span className="text-[10px] text-[#7f7b73] block">{ev.category}</span>
                          </div>
                          <div>
                            <div className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 w-fit mb-1">
                              {ev.club}
                            </div>
                            <h4 className="text-sm font-bold text-[#1a1917]">{ev.title}</h4>
                            <p className="text-xs text-[#6e6a62] mt-0.5">{ev.venue} • {ev.registeredCount} Registered</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedEventModal(ev)}
                            className="px-4 py-1.5 rounded-full border border-[#ded9cb] bg-white hover:bg-[#f6f4ee] text-xs font-medium cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => toggleRegistration(ev.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer ${
                              registeredEvents.includes(ev.id)
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#1b1916] text-white hover:bg-black'
                            }`}
                          >
                            {registeredEvents.includes(ev.id) ? 'Booked ✓' : 'RSVP'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: REVIEWS */}
        {/* ========================================================================= */}
        {activeTab === 'Reviews' && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8a867c] font-semibold">Student Feedback</span>
                <h1 className="text-3xl font-serif text-[#1b1916]">Event Reviews & Ratings</h1>
                <p className="text-xs text-[#736e65] mt-1">
                  Leave feedback on logistics, speakers, and sound setup for recent events.
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#ded9cb]">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-[#1a1917]">
                  {reviews.length
                    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                    : '5.0'}
                </span>
                <span className="text-[11px] text-[#807c74]">({reviews.length} Reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Review Submit Form */}
              <div className="lg:col-span-4 bg-white/80 rounded-[32px] p-6 border border-[#ece7dc] shadow-xs h-fit">
                <h3 className="text-base font-semibold text-[#1c1a17] mb-1">Leave Event Feedback</h3>
                <p className="text-xs text-[#706c64] mb-4">Share your experience to help society organizers.</p>

                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3b3833] mb-1">Your Name</label>
                    <input
                      type="text"
                      value={newReviewForm.reviewer}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, reviewer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3b3833] mb-1">Event</label>
                    <select
                      value={newReviewForm.eventName}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, eventName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none"
                    >
                      {events.map((ev) => (
                        <option key={ev.id} value={ev.title}>{ev.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3b3833] mb-1">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setNewReviewForm({ ...newReviewForm, rating: num })}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition cursor-pointer ${
                            newReviewForm.rating >= num
                              ? 'bg-[#ffea79] text-black shadow-xs'
                              : 'bg-[#faf8f2] border border-[#ded8cb] text-[#888]'
                          }`}
                        >
                          ★ {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3b3833] mb-1">Your Feedback</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How was the event? What could be improved?"
                      value={newReviewForm.comment}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#1b1916] hover:bg-black text-white text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-8 space-y-4">
                {reviews.length === 0 ? (
                  <div className="p-8 text-center bg-white/60 rounded-3xl border border-[#ece7dc]">
                    <p className="text-xs text-[#777]">No reviews yet. Be the first to review an event!</p>
                  </div>
                ) : (
                  reviews.map((r) => (
                    <div
                      key={r.id}
                      className="bg-white/80 rounded-[28px] p-5 border border-[#ece7dc] shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#1b1916]">{r.reviewer}</h4>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f4f1e8] text-[#555]">
                              {r.role}
                            </span>
                          </div>
                          <div className="text-xs text-[#807c74] mt-0.5">
                            Event: <span className="font-semibold text-black">{r.eventName}</span> • {r.date}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-[#ffea79]/40 px-2.5 py-1 rounded-full text-xs font-bold text-amber-950">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{r.rating}.0</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#524e47] mt-3 leading-relaxed">
                        "{r.comment}"
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#ede9de] flex items-center justify-between text-xs">
                        <button
                          onClick={() => toggleReviewLike(r.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition cursor-pointer ${
                            r.liked ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-[#777] hover:bg-[#f5f2ea]'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{r.likes} Helpful</span>
                        </button>

                        <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* HOST NEW EVENT MODAL WITH PICTURE UPLOAD */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#fbf9f4] border border-[#ded9cd] rounded-[36px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0ece2] border border-[#e2ddd0] flex items-center justify-center text-sm font-semibold text-[#555] hover:bg-black hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#1b1916] mb-1">Host College Event</h2>
            <p className="text-xs text-[#706c64] mb-5">
              Publish your club event with banner upload, capacity, date, and venue.
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              {/* Picture Upload Zone */}
              <div>
                <label className="block text-xs font-semibold text-[#3b3833] mb-1">
                  Event Banner / Poster
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-[#ded8cb] group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setNewEvent((prev) => ({ ...prev, image: '' }));
                      }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center text-xs hover:bg-rose-600 transition"
                      title="Remove image"
                    >
                      ✕
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-black/70 text-white text-[11px] font-medium hover:bg-black"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#dcd6c7] rounded-2xl p-5 text-center cursor-pointer hover:border-black bg-white/60 transition flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#1e1d1a]">Upload Event Picture</span>
                      <p className="text-[10px] text-[#88837a]">PNG, JPG, WebP up to 5MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#3b3833] mb-1">Event Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. AI Hackathon or Battle of Bands"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ded8cb] text-sm text-[#1e1d1a] focus:outline-none focus:border-black"
                />
              </div>

              {/* Club & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3b3833] mb-1">Organizing Club</label>
                  <select
                    value={newEvent.club}
                    onChange={(e) => setNewEvent({ ...newEvent, club: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none focus:border-black"
                  >
                    {clubs.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3b3833] mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none focus:border-black"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Business">Business</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3b3833] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3b3833] mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 04:00 PM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Venue & Capacity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3b3833] mb-1">Venue</label>
                  <select
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none focus:border-black"
                  >
                    {venues.map((v) => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3b3833] mb-1">Seat Capacity</label>
                  <input
                    type="number"
                    min="10"
                    max="2000"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Budget Allocation */}
              <div>
                <label className="block text-xs font-semibold text-[#3b3833] mb-1">Requested Budget ($)</label>
                <input
                  type="number"
                  min="0"
                  value={newEvent.budget}
                  onChange={(e) => setNewEvent({ ...newEvent, budget: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none focus:border-black"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#3b3833] mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Outline schedule, prerequisites, prizes..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-full border border-[#ded8cb] text-xs font-medium text-[#444] hover:bg-[#f0ece2] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1b1916] hover:bg-black text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                >
                  Publish Campus Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REQUEST BUDGET ITEM MODAL */}
      {/* ========================================================================= */}
      {showAddBudgetItemModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#fbf9f4] border border-[#ded9cd] rounded-[36px] max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddBudgetItemModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0ece2] border border-[#e2ddd0] flex items-center justify-center text-sm font-semibold text-[#555] hover:bg-black hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-[#1b1916] mb-1">Request Budget Allocation</h2>
            <p className="text-xs text-[#706c64] mb-4">Submit a budget requisition to the student council.</p>

            <form onSubmit={handleAddBudgetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3b3833] mb-1">Expense Description *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Wireless Mics or Stage Banners"
                  value={newBudgetItem.item}
                  onChange={(e) => setNewBudgetItem({ ...newBudgetItem, item: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3b3833] mb-1">Club / Society</label>
                <select
                  value={newBudgetItem.club}
                  onChange={(e) => setNewBudgetItem({ ...newBudgetItem, club: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none"
                >
                  {clubs.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3b3833] mb-1">Amount ($)</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={newBudgetItem.amount}
                    onChange={(e) => setNewBudgetItem({ ...newBudgetItem, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3b3833] mb-1">Category</label>
                  <select
                    value={newBudgetItem.category}
                    onChange={(e) => setNewBudgetItem({ ...newBudgetItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded8cb] text-xs text-[#1e1d1a] focus:outline-none"
                  >
                    <option value="Production">Production</option>
                    <option value="Awards">Awards</option>
                    <option value="Guest Artist">Guest Artist</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddBudgetItemModal(false)}
                  className="px-4 py-2 rounded-full border border-[#ded8cb] text-xs font-medium text-[#444] hover:bg-[#f0ece2] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#1b1916] hover:bg-black text-white text-xs font-semibold transition cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EVENT DETAILS POPUP */}
      {/* ========================================================================= */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#fbf9f4] border border-[#ded9cd] rounded-[36px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0ece2] border border-[#e2ddd0] flex items-center justify-center text-sm font-semibold text-[#555] hover:bg-black hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <div className="relative h-44 rounded-2xl overflow-hidden mb-5 bg-[#ede9de]">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#ffea79] text-[#2b2500] font-semibold text-xs px-3 py-1 rounded-full">
                {selectedEventModal.category}
              </span>
            </div>

            <div className="text-xs text-[#807c73] font-semibold uppercase tracking-wider">
              Organized by {selectedEventModal.club}
            </div>
            <h2 className="text-2xl font-bold text-[#1a1917] mt-1">{selectedEventModal.title}</h2>

            <p className="text-sm text-[#5d5952] mt-3 leading-relaxed">
              {selectedEventModal.description}
            </p>

            <div className="grid grid-cols-2 gap-3 my-5">
              <div className="p-3 rounded-2xl bg-[#f4f1e9] border border-[#e8e4d8]">
                <div className="text-[11px] text-[#7d7970]">Date & Time</div>
                <div className="text-xs font-semibold text-[#1c1a17] mt-0.5">
                  {selectedEventModal.date} • {selectedEventModal.time}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#f4f1e9] border border-[#e8e4d8]">
                <div className="text-[11px] text-[#7d7970]">Venue</div>
                <div className="text-xs font-semibold text-[#1c1a17] mt-0.5">
                  {selectedEventModal.venue}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#ede9dc]">
              <div>
                <span className="text-xs text-[#736f66]">Capacity: </span>
                <span className="text-xs font-semibold text-[#1e1e1e]">
                  {selectedEventModal.registeredCount} / {selectedEventModal.capacity} enrolled
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleDeleteEvent(selectedEventModal.id, selectedEventModal.title);
                  }}
                  className="px-3 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    toggleRegistration(selectedEventModal.id);
                    setSelectedEventModal(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    registeredEvents.includes(selectedEventModal.id)
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-[#ffea79] hover:bg-[#ffe55b] text-[#201d16]'
                  }`}
                >
                  {registeredEvents.includes(selectedEventModal.id) ? 'Cancel RSVP' : 'Confirm Registration'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
