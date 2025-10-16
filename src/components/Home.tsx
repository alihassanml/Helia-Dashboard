import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Wrench, BarChart, Clock, Shield, Star, ArrowRight, CheckCircle, TrendingUp, Zap, Award } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
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
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
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
      <div className="relative bg-gradient-to-r from-sky-500 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Property Management?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Join thousands of property managers who trust our platform
          </p>
          <button className="bg-white text-sky-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">&copy; 2025 Property Management System. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-2">Designed with ❤️ for property managers</p>
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