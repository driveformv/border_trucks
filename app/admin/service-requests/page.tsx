"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { ref, get, update } from "firebase/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ServiceRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  date: string;
  services: string;
  notes?: string;
  status: string;
  createdAt: number;
}

export default function ServiceRequestsPage() {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const serviceRequestsRef = ref(db, "serviceRequests");
        const snapshot = await get(serviceRequestsRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const requestsArray = Object.entries(data).map(([id, request]: [string, any]) => ({
            id,
            ...request,
          }));
          
          // Sort by createdAt (newest first)
          requestsArray.sort((a, b) => b.createdAt - a.createdAt);
          
          setServiceRequests(requestsArray);
          setFilteredRequests(requestsArray);
        }
      } catch (error) {
        console.error("Error fetching service requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...serviceRequests];
    
    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(request => request.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(request => 
        request.firstName.toLowerCase().includes(term) ||
        request.lastName.toLowerCase().includes(term) ||
        request.email.toLowerCase().includes(term) ||
        request.phone.includes(term) ||
        request.zipCode.includes(term)
      );
    }
    
    setFilteredRequests(filtered);
  }, [serviceRequests, statusFilter, searchTerm]);

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const updates: Record<string, string> = {};
      updates[`serviceRequests/${requestId}/status`] = newStatus;
      await update(ref(db), updates);
      
      // Update local state
      setServiceRequests(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: newStatus } 
            : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading service requests...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Service Requests</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No service requests found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">
                    {request.firstName} {request.lastName}
                  </CardTitle>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Contact Information</p>
                    <p><strong>Email:</strong> {request.email}</p>
                    <p><strong>Phone:</strong> {request.phone}</p>
                    <p><strong>ZIP Code:</strong> {request.zipCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Details</p>
                    <p><strong>Preferred Date:</strong> {request.date}</p>
                    <p><strong>Services:</strong> {request.services}</p>
                    <p><strong>Notes:</strong> {request.notes || "None"}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      <strong>Created:</strong> {new Date(request.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={request.status === "pending" ? "default" : "outline"}
                      onClick={() => updateRequestStatus(request.id, "pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      size="sm"
                      variant={request.status === "in_progress" ? "default" : "outline"}
                      onClick={() => updateRequestStatus(request.id, "in_progress")}
                    >
                      In Progress
                    </Button>
                    <Button
                      size="sm"
                      variant={request.status === "completed" ? "default" : "outline"}
                      onClick={() => updateRequestStatus(request.id, "completed")}
                    >
                      Completed
                    </Button>
                    <Button
                      size="sm"
                      variant={request.status === "cancelled" ? "default" : "outline"}
                      onClick={() => updateRequestStatus(request.id, "cancelled")}
                    >
                      Cancelled
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
