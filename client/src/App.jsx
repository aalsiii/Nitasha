import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/common/ScrollToTop'; // Import ScrollToTop
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import BookingModal from './components/features/booking/BookingModal';
import Home from './pages/Home';
import ClientForm from './pages/ClientForm';
import Contact from './pages/Contact';
import About from './pages/About';
import TreatmentsOverview from './pages/TreatmentsOverview';
import TreatmentDetail from './pages/TreatmentDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import FAQs from './pages/FAQs';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';

// Placeholder Pages for links not fully fully implemented in original
const PlaceholderPage = ({ title }) => (
  <div className="pt-32 pb-20 container mx-auto text-center px-6 min-h-[60vh] flex flex-col justify-center items-center">
    <h1 className="text-4xl font-serif text-sage-deep mb-4 capitalize">{title}</h1>
    <p className="text-gray-600 mb-8">This page is currently under construction.</p>
    <Link to="/">
      <button className="px-6 py-2 text-white bg-sage-DEFAULT rounded hover:bg-sage-dark transition-colors">Return Home</button>
    </Link>
  </div>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = (serviceName = null) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop /> {/* Add ScrollToTop here */}
        <div className="min-h-screen flex flex-col font-sans">
          <Navigation
            isScrolled={isScrolled}
            onOpenBooking={() => window.location.href = '/booking'}
          />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home onOpenBooking={() => handleOpenBooking()} />} />
              <Route path="/client-form" element={<ClientForm />} />
              <Route path="/booking" element={<Booking onOpenBooking={() => handleOpenBooking()} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/treatments" element={<TreatmentsOverview />} />
              <Route path="/treatments/:slug" element={<TreatmentDetail onOpenBooking={handleOpenBooking} />} />
              <Route path="/about" element={<About onOpenBooking={() => setIsBookingOpen(true)} />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
              <Route path="/changepassword" element={<ChangePassword />} />

              {/* Resources */}
              <Route path="/resources/blogs" element={<Blogs />} />
              <Route path="/resources/blogs/:slug" element={<BlogDetail />} />
              <Route path="/resources/faqs" element={<FAQs />} />
              <Route path="/resources" element={<Blogs />} />

              {/* Protected Routes */}
              <Route path="" element={<AdminRoute />}>
                <Route path="/admin" element={<Admin />} />
              </Route>

              <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
            </Routes>
          </main>

          <Footer />

          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            selectedService={selectedService}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
