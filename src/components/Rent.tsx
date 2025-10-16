import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { X, User, Phone, Mail, DollarSign, Briefcase, Calendar, Home, 
CheckCircle, AlertCircle, ArrowLeft, TrendingUp, Users, 
  Clock, CreditCard, Eye, Filter, Search, Download, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Rent = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://n8n.cloudboticsconsultancy.com/webhook/a0b65aad-f5d8-4848-a77c-dfc6f138d4a2');
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setTenants(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    if (!tenants.length) return { totalRent: 0, dueToday: 0, totalTenants: 0, rentByDate: [] };

    const today = new Date().toISOString().split('T')[0];
    const totalRent = tenants.reduce((sum, tenant) => sum + tenant.Amount, 0);
    const dueToday = tenants.filter(tenant => tenant["Due Date"].split('T')[0] === today).length;
    
    // Group rent by date for chart
    const rentByDate = {};
    tenants.forEach(tenant => {
      const date = tenant["Due Date"].split('T')[0];
      rentByDate[date] = (rentByDate[date] || 0) + tenant.Amount;
    });

    const chartData = Object.entries(rentByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7) // Last 7 days
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount
      }));

    return {
      totalRent,
      dueToday,
      totalTenants: tenants.length,
      chartData
    };
  };

  const stats = calculateStats();

  // Income distribution for pie chart
  const incomeDistribution = [
    { name: 'Above 10k', value: tenants.filter(t => t["Monthly Income"] === "Above 10k").length, color: '#10b981' },
    { name: '5k-10k', value: tenants.filter(t => t["Monthly Income"] === "Between 5k–10k").length, color: '#3b82f6' },
    { name: 'Below 5k', value: tenants.filter(t => t["Monthly Income"] === "Less than < 5k").length, color: '#f59e0b' }
  ];

  const openModal = (tenant) => {
    setSelectedTenant(tenant);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTenant(null);
  };

  const getIncomeColor = (income) => {
    if (income === "Above 10k") return "text-green-600 bg-green-50 border-green-200";
    if (income === "Between 5k–10k") return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  const getRentalHistoryBadge = (history) => {
    if (history === "Excellent") return "bg-green-100 text-green-800 border-green-200";
    if (history === "Good") return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-orange-100 text-orange-800 border-orange-200";
  };

  // Filter tenants based on search and filter
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.Email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'sent' && tenant["Email Sent"] === "SENT") ||
                         (filterStatus === 'pending' && tenant["Email Sent"] !== "SENT");
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading tenant data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-red-600 flex items-center gap-3">
            <AlertCircle size={24} />
            <span className="font-semibold">Error: {error}</span>
          </div>
          <button 
            onClick={fetchTenants}
            className="mt-4 w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Tenant Management Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Manage and review tenant applications</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-sky-100 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalTenants}</h3>
            <p className="text-sm text-gray-600 mt-1">Active Tenants</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Revenue</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">${stats.totalRent.toLocaleString()}</h3>
            <p className="text-sm text-gray-600 mt-1">Total Rent Amount</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Today</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.dueToday}</h3>
            <p className="text-sm text-gray-600 mt-1">Due Today</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Growth</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">+12%</h3>
            <p className="text-sm text-gray-600 mt-1">This Month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Rent by Date Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Rent Due by Date</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value) => `$${value}`}
                />
                <Bar dataKey="amount" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Income Distribution Pie Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Income Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {incomeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {incomeDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="text-gray-500 w-5 h-5" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            >
              <option value="all">All Tenants</option>
              <option value="sent">Email Sent</option>
              <option value="pending">Email Pending</option>
            </select>
          </div>
        </div>

        {/* Tenants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenants.map((tenant) => (
            <div
              key={tenant.row_number}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Card Header with Gradient */}
              <div className="h-2 bg-gradient-to-r from-sky-400 to-blue-500"></div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{tenant.Name}</h3>
                    <p className="text-sm text-gray-500 mt-1">ID: #{tenant.row_number}</p>
                  </div>
                  <div className="relative">
                    {tenant["Email Sent"] === "SENT" ? (
                      <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                        <CheckCircle className="text-green-600 w-4 h-4" />
                        <span className="text-xs font-medium text-green-700">Sent</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
                        <AlertCircle className="text-orange-600 w-4 h-4" />
                        <span className="text-xs font-medium text-orange-700">Pending</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 group">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm truncate flex-1">{tenant.Email}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{tenant["Employ Status"]}</span>
                  </div>

                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getIncomeColor(tenant["Monthly Income"])}`}>
                      {tenant["Monthly Income"]}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getRentalHistoryBadge(tenant["Rental History"])}`}>
                        {tenant["Rental History"]} History
                      </span>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Monthly Rent</p>
                        <p className="text-xl font-bold text-gray-900">${tenant.Amount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openModal(tenant)}
                  className="mt-5 w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  <Eye size={18} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && selectedTenant && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center p-4 z-50 ">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Tenant Details</h2>
                <p className="text-sky-100 mt-1">Complete tenant information</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-sky-500" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-semibold text-gray-900">{selectedTenant.Name}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="font-semibold text-gray-900">{selectedTenant.Email}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-semibold text-gray-900">{selectedTenant.Phone}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Zip Code</p>
                      <p className="font-semibold text-gray-900">{selectedTenant["Zip Code"]}</p>
                    </div>
                  </div>
                </div>

                {/* Employment & Financial */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-sky-500" />
                    Employment & Financial
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Employment Status</p>
                      <p className="font-semibold text-gray-900">{selectedTenant["Employ Status"]}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Monthly Income</p>
                      <p className={`font-semibold inline-flex px-3 py-1 rounded-full text-sm ${getIncomeColor(selectedTenant["Monthly Income"])}`}>
                        {selectedTenant["Monthly Income"]}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Rent Due Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedTenant["Due Date"]).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Monthly Rent Amount</p>
                      <p className="font-semibold text-2xl text-gray-900">${selectedTenant.Amount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-blue-500" />
                    Rental Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rental History</span>
                      <span className={`font-medium px-3 py-1 rounded-full text-sm ${getRentalHistoryBadge(selectedTenant["Rental History"])}`}>
                        {selectedTenant["Rental History"]}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">References</span>
                      <span className="font-medium">
                        {selectedTenant.References === "Yes" ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle size={16} /> Provided
                          </span>
                        ) : (
                          <span className="text-orange-600 flex items-center gap-1">
                            <AlertCircle size={16} /> Not Provided
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-500" />
                    Communication Status
                  </h3>
                  <div className="flex items-center justify-center py-4">
                    {selectedTenant["Email Sent"] === "SENT" ? (
                      <div className="text-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <span className="text-green-700 font-semibold">Email Successfully Sent</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                        <span className="text-orange-700 font-semibold">Email Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sky-500" />
                  Tenant Summary
                </h3>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedTenant.Summary}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 justify-end">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  Send Reminder
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all font-medium shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Rent;