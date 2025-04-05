
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpDown, User, Bell, X } from "lucide-react";

interface DonorData {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  organs: string[];
  city: string;
  registeredAt: string;
  status: "pending" | "matched" | "completed";
}

interface RecipientData {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  organNeeded: string;
  city: string;
  requestedAt: string;
  status: "searching" | "matched" | "completed";
}

interface MatchData {
  id: string;
  donorId: string;
  donorName: string;
  recipientId: string;
  recipientName: string;
  organ: string;
  matchDate: string;
  status: "pending" | "approved" | "in-progress" | "completed";
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"donors" | "recipients" | "matches">("donors");
  const [donors, setDonors] = useState<DonorData[]>([]);
  const [recipients, setRecipients] = useState<RecipientData[]>([]);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Generate mock data on component mount
  useEffect(() => {
    const mockDonors: DonorData[] = [];
    const mockRecipients: RecipientData[] = [];
    const mockMatches: MatchData[] = [];
    
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const organs = ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Cornea"];
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
    const statuses = ["pending", "matched", "completed"];
    const recipientStatuses = ["searching", "matched", "completed"];
    const matchStatuses = ["pending", "approved", "in-progress", "completed"];
    
    // Generate donors
    for (let i = 1; i <= 20; i++) {
      const bloodGroup = bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
      const organsList = [];
      const numOrgans = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numOrgans; j++) {
        const organ = organs[Math.floor(Math.random() * organs.length)];
        if (!organsList.includes(organ)) {
          organsList.push(organ);
        }
      }
      
      mockDonors.push({
        id: `D${1000 + i}`,
        name: `Donor ${i}`,
        age: Math.floor(Math.random() * 40) + 20,
        bloodGroup,
        organs: organsList,
        city: cities[Math.floor(Math.random() * cities.length)],
        registeredAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: statuses[Math.floor(Math.random() * statuses.length)] as any
      });
    }
    
    // Generate recipients
    for (let i = 1; i <= 15; i++) {
      mockRecipients.push({
        id: `R${2000 + i}`,
        name: `Recipient ${i}`,
        age: Math.floor(Math.random() * 40) + 20,
        bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
        organNeeded: organs[Math.floor(Math.random() * organs.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        requestedAt: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: recipientStatuses[Math.floor(Math.random() * recipientStatuses.length)] as any
      });
    }
    
    // Generate matches
    for (let i = 1; i <= 10; i++) {
      const donorIndex = Math.floor(Math.random() * mockDonors.length);
      const recipientIndex = Math.floor(Math.random() * mockRecipients.length);
      const donor = mockDonors[donorIndex];
      const recipient = mockRecipients[recipientIndex];
      const organ = recipient.organNeeded;
      
      mockMatches.push({
        id: `M${3000 + i}`,
        donorId: donor.id,
        donorName: donor.name,
        recipientId: recipient.id,
        recipientName: recipient.name,
        organ,
        matchDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: matchStatuses[Math.floor(Math.random() * matchStatuses.length)] as any
      });
    }
    
    setDonors(mockDonors);
    setRecipients(mockRecipients);
    setMatches(mockMatches);
    
    // Show a notification after a delay
    setTimeout(() => {
      setNotificationMessage("New donor registered: Sarah Johnson (Los Angeles)");
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }, 3000);
  }, []);

  const filteredDonors = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    donor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRecipients = recipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredMatches = matches.filter(match =>
    match.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Monitor and manage all donors, recipients, and matches
            </p>
          </div>
          
          <div className="relative mt-4 md:mt-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, ID, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-spectrum-purple focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("donors")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "donors"
                ? "text-spectrum-purple border-b-2 border-spectrum-purple"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Donors ({donors.length})
          </button>
          <button
            onClick={() => setActiveTab("recipients")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "recipients"
                ? "text-spectrum-purple border-b-2 border-spectrum-purple"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Recipients ({recipients.length})
          </button>
          <button
            onClick={() => setActiveTab("matches")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "matches"
                ? "text-spectrum-purple border-b-2 border-spectrum-purple"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Matches ({matches.length})
          </button>
        </div>
        
        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card overflow-hidden"
        >
          {activeTab === "donors" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        ID <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Name <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Age <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Blood Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Organs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        City <Filter size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Registered <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Status <Filter size={14} className="ml-1" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredDonors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {donor.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-spectrum-purple/10 flex items-center justify-center mr-3">
                            <User size={16} className="text-spectrum-purple" />
                          </div>
                          {donor.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {donor.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {donor.bloodGroup}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex flex-wrap gap-1">
                          {donor.organs.map((organ) => (
                            <span key={organ} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                              {organ}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {donor.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {donor.registeredAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          donor.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-200" :
                          donor.status === "matched" ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200" :
                          "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200"
                        }`}>
                          {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === "recipients" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        ID <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Name <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Age <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Blood Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Organ Needed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        City <Filter size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Requested <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Status <Filter size={14} className="ml-1" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRecipients.map((recipient) => (
                    <tr key={recipient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {recipient.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-spectrum-blue/10 flex items-center justify-center mr-3">
                            <User size={16} className="text-spectrum-blue" />
                          </div>
                          {recipient.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {recipient.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {recipient.bloodGroup}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                          {recipient.organNeeded}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {recipient.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {recipient.requestedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          recipient.status === "searching" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-200" :
                          recipient.status === "matched" ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200" :
                          "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200"
                        }`}>
                          {recipient.status.charAt(0).toUpperCase() + recipient.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === "matches" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Match ID <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Donor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Organ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Match Date <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        Status <Filter size={14} className="ml-1" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMatches.map((match) => (
                    <tr key={match.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {match.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex flex-col">
                          <span>{match.donorName}</span>
                          <span className="text-xs text-gray-500">{match.donorId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex flex-col">
                          <span>{match.recipientName}</span>
                          <span className="text-xs text-gray-500">{match.recipientId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                          {match.organ}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {match.matchDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          match.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-200" :
                          match.status === "approved" ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200" :
                          match.status === "in-progress" ? "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-200" :
                          "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200"
                        }`}>
                          {match.status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>
      
      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="glass-card shadow-lg py-3 px-4 rounded-lg flex items-center space-x-3">
              <div className="h-8 w-8 bg-spectrum-purple/10 rounded-full flex items-center justify-center">
                <Bell size={16} className="text-spectrum-purple" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notificationMessage}</p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
