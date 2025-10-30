import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Wrench, BarChart, Clock, Shield, Star, ArrowRight, CheckCircle, TrendingUp, Zap, Award, FileText, Home as HomeIcon } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  
  const openIssuesForm = () => {
    window.open('https://n8n.cloudboticsconsultancy.com/form/64563462333', '_blank');
  };

  const openRentForm = () => {
    window.open('https://n8n.cloudboticsconsultancy.com/form/4324324', '_blank');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
      {/* Navbar */}
      <nav className="relative bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <HomeIcon className="w-8 h-8 text-sky-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">PropertyHub</span>
            </div>
            
            {/* Form Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={openRentForm}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Users className="w-4 h-4 mr-2" />
                Rent Form
              </button>
              
              <button
                onClick={openIssuesForm}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Wrench className="w-4 h-4 mr-2" />
                Issues Form
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-sky-100 text-sky-800 text-sm font-medium px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 1000+ Property Managers
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 animate-fade-in-up">
              Property Management
              <span className="block bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent mt-2">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
              Streamline your rental management with our comprehensive platform. 
              Handle tenants, track issues, and manage properties all in one place.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600 mt-1">Properties Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20" id='home'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rent Management Card */}
          <div
            onClick={() => navigate('/rent')}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-10 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-sky-100 to-sky-50 rounded-bl-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                <Users className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Rent Management
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                View and manage tenant applications, track rental payments, and monitor tenant profiles with ease
              </p>
              
              <div className="flex items-center space-x-4 text-lg">
                <span className="font-semibold text-sky-600">Manage Tenants</span>
                <ArrowRight className="w-5 h-5 text-sky-600 group-hover:translate-x-2 transition-transform" />
              </div>
              
              {/* Features */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Real-time tenant tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Automated payment reminders
                </div>
              </div>
            </div>
          </div>

          {/* Issues Card */}
          <div
            onClick={() => navigate('/issues')}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-10 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-100 to-orange-50 rounded-bl-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                <Wrench className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Issues & Maintenance
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Track maintenance requests, manage repairs, and keep your properties in perfect condition
              </p>
              
              <div className="flex items-center space-x-4 text-lg">
                <span className="font-semibold text-orange-600">View Issues</span>
                <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-2 transition-transform" />
              </div>
              
              {/* Features */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Priority-based tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Maintenance scheduling
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your properties efficiently and grow your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Real-time Analytics</h3>
              <p className="text-gray-600 text-center">Track performance with comprehensive dashboards and actionable insights</p>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Secure & Reliable</h3>
              <p className="text-gray-600 text-center">Your data is protected with enterprise-grade security and encryption</p>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Lightning Fast</h3>
              <p className="text-gray-600 text-center">Automate routine tasks and focus on growing your business efficiently</p>
            </div>
          </div>
          
          {/* Additional Features */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-sky-500 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Award Winning</h4>
              <p className="text-sm text-gray-600 mt-1">Best in class platform</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-sky-500 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">24/7 Support</h4>
              <p className="text-sm text-gray-600 mt-1">Always here to help</p>
            </div>
            <div className="text-center">
              <BarChart className="w-12 h-12 text-sky-500 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Detailed Reports</h4>
              <p className="text-sm text-gray-600 mt-1">Comprehensive insights</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-sky-500 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">99.9% Uptime</h4>
              <p className="text-sm text-gray-600 mt-1">Reliable performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
   

      {/* Footer */}
  <footer className="bg-gray-900 text-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      {/* Company Info */}
      <div className="md:col-span-2">
        <h3 className="text-xl font-bold mb-4">Cloud Botics Consultancy</h3>
        <p className="text-gray-400 mb-4">
          Transforming businesses through innovative cloud solutions, automation, 
          and cutting-edge technology consulting services.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Services</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-white transition-colors">Cloud Solutions</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Automation</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
          <li><a href="#" className="hover:text-white transition-colors">AI/ML Solutions</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Contact</h4>
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:info@cloudboticsconsultancy.com" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
            </svg>
            <a href="https://cloudboticsconsultancy.com" className="hover:text-white transition-colors">
              cloudboticsconsultancy.com
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="border-t border-gray-800 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">
          &copy; 2025 Cloud Botics Consultancy. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
            Cookie Policy
          </a>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-4 text-center md:text-left">
        Empowering businesses with innovative technology solutions 🚀
      </p>
    </div>
  </div>
</footer>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;