import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, AlertCircle, CheckCircle, Clock, Wrench, Phone, MapPin, Calendar, Filter, Search, Download, Eye, Zap, Droplet, Lock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Issues = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://n8n.cloudboticsconsultancy.com/webhook/a0b65aad-f5d8-484');
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setIssues(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (!issues.length) return { totalIssues: 0, byCategory: [], urgent: 0 };

    const byCategory = {};
    let urgent = 0;

    issues.forEach(issue => {
      const category = issue["Issues Type"] || "Other";
      byCategory[category] = (byCategory[category] || 0) + 1;
    });

    const chartData = Object.entries(byCategory).map(([category, count]) => ({
      name: category,
      value: count
    }));

    return {
      totalIssues: issues.length,
      byCategory: chartData,
      urgent: issues.filter(i => i["Issues Type"] === "Plumbing" || i["Issues Type"] === "Electrical").length
    };
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Plumbing':
        return <Droplet className="w-5 h-5" />;
      case 'Electrical':
        return <Zap className="w-5 h-5" />;
      case 'HVAC':
        return <Wrench className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Plumbing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Electrical':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HVAC':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch(category) {
      case 'Plumbing':
        return 'bg-blue-100 text-blue-700';
      case 'Electrical':
        return 'bg-yellow-100 text-yellow-700';
      case 'HVAC':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = calculateStats();

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.Issues.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterCategory === 'all' || issue["Issues Type"] === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const pieData = [
    { name: 'Plumbing', value: issues.filter(i => i["Issues Type"] === 'Plumbing').length, color: '#3b82f6' },
    { name: 'Electrical', value: issues.filter(i => i["Issues Type"] === 'Electrical').length, color: '#f59e0b' },
    { name: 'HVAC', value: issues.filter(i => i["Issues Type"] === 'HVAC').length, color: '#a855f7' },
    { name: 'Other', value: issues.filter(i => !['Plumbing', 'Electrical', 'HVAC'].includes(i["Issues Type"])).length, color: '#6b7280' }
  ].filter(item => item.value > 0);

  const openModal = (issue) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedIssue(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading maintenance issues...</p>
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
            onClick={fetchIssues}
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
                  Maintenance Issues
                </h1>
                <p className="text-gray-600 mt-1">Track and manage property maintenance requests</p>
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
              <div className="p-3 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalIssues}</h3>
            <p className="text-sm text-gray-600 mt-1">Open Issues</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Urgent</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.urgent}</h3>
            <p className="text-sm text-gray-600 mt-1">Critical Issues</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                <Droplet className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Plumbing</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{issues.filter(i => i["Issues Type"] === 'Plumbing').length}</h3>
            <p className="text-sm text-gray-600 mt-1">Water Related</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <Wrench className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Types</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.byCategory.length}</h3>
            <p className="text-sm text-gray-600 mt-1">Categories</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Issues by Category */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Issues by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.byCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 flex-wrap">
              {pieData.map((item) => (
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
              placeholder="Search by name, address, or issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="text-gray-500 w-5 h-5" />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            >
              <option value="all">All Categories</option>
              {stats.byCategory.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <div
              key={issue.ID}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Card Header */}
              <div className={`h-2 bg-gradient-to-r from-sky-400 to-blue-500`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{issue.Name}</h3>
                    <p className="text-sm text-gray-500 mt-1">ID: {issue.ID.substring(0, 8)}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(issue["Issues Type"])}`}>
                    {getCategoryIcon(issue["Issues Type"])}
                    {issue["Issues Type"]}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start text-gray-600">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3 mt-0.5">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Issue</p>
                      <p className="text-sm font-medium">{issue.Issues}</p>
                    </div>
                  </div>

                  <div className="flex items-start text-gray-600">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm font-medium">{issue.Address}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{issue["Contact "]}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">{new Date(issue["Date / Time"]).toLocaleDateString()}</span>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(issue["Issues Type"])}`}>
                        {issue["Issues Type"]}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openModal(issue)}
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

      {/* Modal */}
      {showModal && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Issue Details</h2>
                <p className="text-sky-100 mt-1">Maintenance request information</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Tenant Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-sky-500" />
                    Issue Details
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Issue Type</p>
                      <p className={`font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getCategoryBadgeColor(selectedIssue["Issues Type"])}`}>
                        {getCategoryIcon(selectedIssue["Issues Type"])}
                        {selectedIssue["Issues Type"]}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Issue Description</p>
                      <p className="font-semibold text-gray-900">{selectedIssue.Issues}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Reported Date</p>
                      <p className="font-semibold text-gray-900">{new Date(selectedIssue["Date / Time"]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-sky-500" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Tenant Name</p>
                      <p className="font-semibold text-gray-900">{selectedIssue.Name}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-semibold text-gray-900">{selectedIssue["Contact "]}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="font-semibold text-gray-900">{selectedIssue.Address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Location Information
                </h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Full Address:</span> {selectedIssue.Address}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 justify-end">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  Schedule Visit
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
    </div>
  );
};

export default Issues;