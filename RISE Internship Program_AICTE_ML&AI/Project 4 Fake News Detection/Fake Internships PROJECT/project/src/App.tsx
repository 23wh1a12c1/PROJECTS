import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Heart, 
  Phone, 
  Mail, 
  Globe, 
  Award, 
  Users, 
  Target, 
  Star,
  ArrowRight,
  Menu,
  X,
  Zap,
  Shield,
  TrendingUp,
  Download,
  Send,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Library,
  PenTool,
  FileText,
  Bookmark
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    experience: '',
    message: ''
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(`Thank you ${formData.name}! Your application has been submitted successfully. We'll contact you within 24 hours at ${formData.email}.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      experience: '',
      message: ''
    });
    setShowApplicationForm(false);
  };

  const handleDownloadBrochure = () => {
    // Simulate brochure download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,RISE by Tamizhan Skills - Free Internship Program Brochure\n\nReal Skills. Real Experience. Real Future.\n\nCompletely Free Internship Program\n- No hidden fees\n- Real projects with weekly guidance\n- Industry-aligned portfolio building\n- Wipro certification\n\nContact: +91 6383418100\nEmail: contact@tamizhanskills.com\nWebsite: www.tamizhanskills.com';
    link.download = 'RISE-Internship-Brochure.txt';
    link.click();
    setShowBrochureModal(false);
    alert('Brochure downloaded successfully!');
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      facebook: 'https://facebook.com/tamizhanskills',
      twitter: 'https://twitter.com/tamizhanskills',
      linkedin: 'https://linkedin.com/company/tamizhanskills',
      instagram: 'https://instagram.com/tamizhanskills'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`);
        break;
      case 'email':
        window.open(`mailto:${value}`);
        break;
      case 'website':
        window.open(`https://${value}`, '_blank');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Empty div to maintain layout */}
            <div className="flex-shrink-0"></div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-yellow-300 transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('why-different')} className="text-white hover:text-yellow-300 transition-colors font-medium">Why Different</button>
              <button onClick={() => scrollToSection('features')} className="text-white hover:text-yellow-300 transition-colors font-medium">Features</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-yellow-300 transition-colors font-medium">Contact</button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-yellow-300 focus:outline-none focus:text-yellow-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-800 border-t border-white/20">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-white hover:text-yellow-300 transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('why-different')} className="block w-full text-left px-3 py-2 text-white hover:text-yellow-300 transition-colors font-medium">Why Different</button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-2 text-white hover:text-yellow-300 transition-colors font-medium">Features</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-white hover:text-yellow-300 transition-colors font-medium">Contact</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 py-20 relative overflow-hidden">
        {/* Background decorative elements - Education themed */}
        <div className="absolute top-10 left-10 text-blue-400 opacity-20">
          <BookOpen size={60} />
        </div>
        <div className="absolute top-20 right-20 text-purple-400 opacity-20">
          <GraduationCap size={80} />
        </div>
        <div className="absolute bottom-20 left-1/4 text-green-400 opacity-20">
          <Library size={50} />
        </div>
        <div className="absolute bottom-10 right-1/3 text-orange-400 opacity-20">
          <PenTool size={70} />
        </div>
        <div className="absolute top-1/2 left-1/2 text-pink-400 opacity-10">
          <FileText size={90} />
        </div>
        <div className="absolute top-32 left-1/3 text-indigo-400 opacity-15">
          <Bookmark size={45} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                <BookOpen className="text-blue-500 animate-bounce" size={40} />
                <span className="text-4xl">📚</span>
                <GraduationCap className="text-purple-500 animate-bounce delay-100" size={40} />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Real Skills. Real Experience.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 block">Real Future.</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Join RISE by Tamizhan Skills - the only genuine, completely 
              <span className="font-bold text-green-600"> FREE </span>
              <BookOpen className="inline text-green-500" size={24} />
              internship program that builds real portfolios and provides industry-aligned experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center group"
              >
                <GraduationCap className="mr-2 text-yellow-300" size={24} />
                Apply Now - FREE!
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="text-white" size={40} />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Cause Is Bigger Than Business
            </h2>
            <div className="flex justify-center items-center mb-4">
              <XCircle className="text-red-500 mr-2" size={24} />
              <p className="text-xl text-gray-700">
                We're not here to make money from students.
              </p>
              <BookOpen className="text-red-500 ml-2" size={24} />
            </div>
            <div className="flex justify-center items-center">
              <CheckCircle className="text-green-500 mr-2" size={24} />
              <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">
                We're here to make students ready for the future.
              </p>
              <Star className="text-yellow-500 ml-2" size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section id="why-different" className="py-20 bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 relative overflow-hidden">
        {/* Background book elements */}
        <div className="absolute top-5 left-5 text-blue-300 opacity-10">
          <Library size={120} />
        </div>
        <div className="absolute bottom-5 right-5 text-purple-300 opacity-10">
          <BookOpen size={100} />
        </div>
        <div className="absolute top-1/2 right-1/4 text-green-300 opacity-10">
          <GraduationCap size={110} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              And Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">RISE</span> Is Different
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <XCircle className="text-red-500 mr-3" size={32} />
                The Rise of Fake Internships
              </h3>
              <p className="text-gray-700 mb-6">
                In today's digital age, thousands of students are falling victim to fake internship programs. 
                These so-called "internships" often:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center mr-3">
                    <XCircle className="text-red-500" size={20} />
                    <BookOpen className="text-red-600 ml-1" size={16} />
                  </div>
                  <p className="text-gray-800 font-medium">Charge students high fees with no learning value</p>
                </div>
                <div className="flex items-start bg-green-50 p-3 rounded-lg">
                  <XCircle className="text-red-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-800 font-medium">Offer certificates without real work or projects</p>
                </div>
                <div className="flex items-start bg-green-50 p-3 rounded-lg">
                  <XCircle className="text-red-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-800 font-medium">Do not provide any mentorship or guidance</p>
                </div>
                <div className="flex items-start bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center mr-3">
                    <XCircle className="text-red-500" size={20} />
                    <PenTool className="text-red-600 ml-1" size={16} />
                  </div>
                  <p className="text-gray-800 font-medium">Exist only to make profits — not to educate</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-100 rounded-lg border-l-4 border-red-500">
                <p className="text-red-800 font-medium">
                  Result: Students lose money, time, and trust — and worst of all,
                  they walk away with zero practical skills!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-200 to-emerald-200 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={32} />
                What Makes RISE Genuine?
              </h3>
              <p className="text-gray-700 mb-6">
                We launched <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">RISE</span> with a strong mission:
              </p>
              <blockquote className="text-lg text-gray-800 italic border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-4 mb-6 bg-green-50 p-4 rounded-r-lg">
                "To provide real, free, skill-based internships that make a difference in students' lives."
              </blockquote>
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="text-green-500" size={32} />
                <span className="text-2xl mx-2">+</span>
                <Shield className="text-blue-500" size={32} />
                <span className="text-2xl mx-2">=</span>
                <TrendingUp className="text-purple-500" size={32} />
              </div>
              <p className="text-center text-gray-700 font-medium">Education + Genuine = Your Success!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 relative overflow-hidden">
        {/* Background education elements */}
        <div className="absolute top-10 left-10 text-blue-200 opacity-15">
          <FileText size={80} />
        </div>
        <div className="absolute bottom-10 right-10 text-purple-200 opacity-15">
          <Bookmark size={70} />
        </div>
        <div className="absolute top-1/3 right-1/3 text-green-200 opacity-10">
          <Library size={90} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Here's How We're Different
            </h2>
            <div className="flex justify-center space-x-4 mb-8">
              <BookOpen className="text-blue-500 animate-pulse" size={40} />
              <span className="text-3xl">✨</span>
              <GraduationCap className="text-purple-500 animate-pulse delay-75" size={40} />
              <span className="text-3xl">🎯</span>
              <Library className="text-green-500 animate-pulse delay-150" size={40} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <div className="flex items-center">
                  <span className="text-white text-2xl font-bold">💯</span>
                  <BookOpen className="text-yellow-300 ml-1" size={20} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Completely Free</span>
              </h3>
              <p className="text-gray-700">No hidden fees, no catches. 100% free internship program with real value!</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-white text-3xl font-bold">🔨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Real Projects</span>
              </h3>
              <p className="text-gray-700">Work on detailed problem statements with weekly guidance and mentorship.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-white text-3xl font-bold">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">Industry-Aligned</span>
              </h3>
              <p className="text-gray-700">Build a real portfolio to showcase your skills to employers.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-white text-3xl font-bold">📜</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">Final Certification</span>
              </h3>
              <p className="text-gray-700">Get certified with <span className="font-semibold text-blue-600">Wipro Credential Reference</span>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-700">
              Our partnerships ensure industry-relevant training and recognized certifications.
            </p>
            <div className="flex justify-center mt-4">
              <BookOpen className="text-blue-500" size={32} />
              <span className="text-2xl mx-2">🤝</span>
              <Award className="text-yellow-500" size={32} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            <button 
              onClick={() => window.open('https://internship.aicte-india.org/', '_blank')}
              className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">NIP</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">National Internship Portal</p>
                <ExternalLink className="text-blue-500 mx-auto mt-1" size={16} />
              </div>
            </button>

            <button 
              onClick={() => window.open('https://www.wipro.com/', '_blank')}
              className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">Wipro</p>
                <ExternalLink className="text-green-500 mx-auto mt-1" size={16} />
              </div>
            </button>

            <button 
              onClick={() => window.open('https://www.skillindia.gov.in/', '_blank')}
              className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">SI</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">Skill India</p>
                <ExternalLink className="text-orange-500 mx-auto mt-1" size={16} />
              </div>
            </button>

            <button 
              onClick={() => window.open('https://www.nsdcindia.org/', '_blank')}
              className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xs">NSDC</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">National Skill Development Corporation</p>
                <ExternalLink className="text-teal-500 mx-auto mt-1" size={16} />
              </div>
            </button>

            <button 
              onClick={() => window.open('https://www.microsoft.com/en-us/education', '_blank')}
              className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xs">MS</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">Microsoft Education</p>
                <ExternalLink className="text-indigo-500 mx-auto mt-1" size={16} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Background education elements */}
        <div className="absolute top-10 left-10 text-yellow-400 opacity-10">
          <GraduationCap size={100} />
        </div>
        <div className="absolute bottom-10 right-10 text-green-400 opacity-10">
          <Library size={120} />
        </div>
        <div className="absolute top-1/2 left-1/4 text-pink-400 opacity-10">
          <BookOpen size={80} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-4">
              <BookOpen className="text-yellow-400 animate-bounce" size={40} />
              <Zap className="text-yellow-300 animate-pulse" size={40} />
              <GraduationCap className="text-green-400 animate-bounce delay-100" size={40} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Real Career Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with genuine, 
            hands-on experience through RISE - completely 
            <span className="font-bold text-yellow-300">FREE!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowApplicationForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center group"
            >
              <GraduationCap className="mr-2 text-yellow-300" size={24} />
              Apply for FREE Internship
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={() => setShowBrochureModal(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Download className="mr-2" size={20} />
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-700">
              Have questions? We're here to help you succeed - for FREE!
            </p>
            <div className="flex justify-center mt-4">
              <BookOpen className="text-blue-500" size={32} />
              <span className="text-2xl mx-2">📞</span>
              <PenTool className="text-green-500" size={32} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <button 
              onClick={() => handleContactClick('phone', '+916383418100')}
              className="text-center group w-full p-6 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-700 font-medium">+91 6383418100</p>
            </button>

            <button 
              onClick={() => handleContactClick('email', 'contact@tamizhanskills.com')}
              className="text-center group w-full p-6 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Mail className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700 font-medium">contact@tamizhanskills.com</p>
            </button>

            <button 
              onClick={() => handleContactClick('website', 'www.tamizhanskills.com')}
              className="text-center group w-full p-6 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Website</h3>
              <p className="text-gray-700 font-medium">www.tamizhanskills.com</p>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold">RISE</h3>
                  <p className="text-gray-300">by Tamizhan Skills</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students with real skills, real experience, and real career opportunities 
                through genuine, completely 
                <span className="font-bold text-green-400">FREE</span>
                <BookOpen className="inline text-green-400 ml-1" size={16} />
                internship programs.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleSocialClick('facebook')}
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-white text-sm font-bold">f</span>
                </button>
                <button 
                  onClick={() => handleSocialClick('twitter')}
                  className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-white text-sm font-bold">t</span>
                </button>
                <button 
                  onClick={() => handleSocialClick('linkedin')}
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-white text-sm font-bold">in</span>
                </button>
                <button 
                  onClick={() => handleSocialClick('instagram')}
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-white text-sm font-bold">ig</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-yellow-300 transition-colors text-left">About RISE</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-yellow-300 transition-colors text-left">Features</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-yellow-300 transition-colors text-left">Contact</button></li>
                <li><button onClick={() => setShowApplicationForm(true)} className="hover:text-yellow-300 transition-colors flex items-center">
                  Apply Now <BookOpen className="ml-1 text-green-400" size={16} />
                </button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-300">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => alert('Help Center coming soon!')} className="hover:text-yellow-300 transition-colors text-left">Help Center</button></li>
                <li><button onClick={() => alert('Privacy Policy coming soon!')} className="hover:text-yellow-300 transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => alert('Terms of Service coming soon!')} className="hover:text-yellow-300 transition-colors text-left">Terms of Service</button></li>
                <li><button onClick={() => alert('FAQ coming soon!')} className="hover:text-yellow-300 transition-colors text-left">FAQ</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <div className="flex justify-center items-center mb-2">
              <BookOpen className="text-green-400" size={20} />
              <span className="mx-2">💯</span>
              <GraduationCap className="text-yellow-400" size={20} />
            </div>
            <p>&copy; 2024 RISE by Tamizhan Skills. All rights reserved.</p>
            <p className="mt-2 text-green-400 font-medium">@tamizhanskills - Making Education FREE & Accessible!</p>
          </div>
        </div>
      </footer>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-green-50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <GraduationCap className="text-green-500 mr-2" size={28} />
                Apply for FREE Internship
              </h3>
              <button 
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-green-50"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-green-50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-green-50"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Course *</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-green-50"
                  >
                    <option value="">Select a course</option>
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="machine-learning">Machine Learning</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="cybersecurity">Cybersecurity</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-green-50"
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3+ years)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join RISE?</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-green-50"
                  placeholder="Tell us about your goals and expectations..."
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center"
                >
                  <Send className="mr-2" size={20} />
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-green-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brochure Download Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-green-50 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Download Brochure</h3>
              <p className="text-gray-600 mb-6">
                Get detailed information about our FREE internship program, courses, and certification process.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDownloadBrochure}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all flex items-center justify-center"
                >
                  <Download className="mr-2" size={20} />
                  Download Now
                </button>
                <button
                  onClick={() => setShowBrochureModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-green-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;