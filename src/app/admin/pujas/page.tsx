"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiMove, FiTrash2 } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export default function AdminPujas() {
  const [pujas, setPujas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pujas")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPujas(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    // Optimistically update UI
    const reorderedPujas = Array.from(pujas);
    const [removed] = reorderedPujas.splice(sourceIndex, 1);
    reorderedPujas.splice(destinationIndex, 0, removed);
    setPujas(reorderedPujas);

    // Save to backend
    const orderedIds = reorderedPujas.map((p) => p._id);
    try {
      await fetch("/api/pujas/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderedIds }),
      });
    } catch (err) {
      console.error("Failed to save reorder", err);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/pujas/${id}/toggle`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setPujas(pujas.map((p) => (p._id === id ? { ...p, isActive: !currentStatus } : p)));
      } else {
        alert("Failed to toggle status");
      }
    } catch (err) {
      console.error(err);
      alert("Error toggling status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this Puja? This action cannot be undone.")) return;
    try {
      const res = await fetch(`/api/pujas/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPujas(pujas.filter(p => p._id !== id));
      } else {
        alert("Failed to delete Puja");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting Puja");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pujas Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage all your online pujas here. Drag to reorder.</p>
        </div>
        <Link
          href="/admin/add-puja"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <FiPlus />
          Add New Puja
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading pujas...</div>
      ) : pujas.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPlus className="text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No pujas found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first online puja offering.</p>
          <Link
            href="/admin/add-puja"
            className="text-blue-600 font-medium hover:underline"
          >
            Add your first Puja &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <DragDropContext onDragEnd={handleDragEnd}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 w-12"></th>
                  <th className="px-6 py-4 font-medium text-gray-600">Title</th>
                  <th className="px-6 py-4 font-medium text-gray-600">Location</th>
                  <th className="px-6 py-4 font-medium text-gray-600">Date</th>
                  <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <Droppable droppableId="pujas-list">
                {(provided) => (
                  <tbody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {pujas.map((puja, index) => (
                      <Draggable key={puja._id} draggableId={puja._id} index={index}>
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border-b border-gray-100 hover:bg-gray-50/50 ${snapshot.isDragging ? "bg-blue-50 shadow-lg" : ""}`}
                            style={{ ...provided.draggableProps.style }}
                          >
                            <td className="px-6 py-4" {...provided.dragHandleProps}>
                              <FiMove className="text-gray-400 cursor-grab active:cursor-grabbing hover:text-gray-600" />
                            </td>
                             <td className="px-6 py-4">
                               <p className="font-semibold text-gray-900 line-clamp-1 flex items-center gap-2">
                                 {puja.title}
                                 {puja.imageSrc && puja.imageSrc.startsWith('/uploads/') && (
                                   <span 
                                     title="Image may need re-upload if file is missing"
                                     className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full font-medium"
                                   >
                                     📷 Check Image
                                   </span>
                                 )}
                               </p>
                               <p className="text-xs text-pink-600 mt-1 uppercase tracking-wider font-bold">
                                 {puja.redSubtitle}
                               </p>
                             </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{puja.location}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{puja.date}</td>
                            <td className="px-6 py-4 flex items-center gap-3">
                              <button
                                onClick={() => handleToggleActive(puja._id, puja.isActive !== false)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                                  puja.isActive !== false ? "bg-green-500" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                                role="switch"
                                aria-checked={puja.isActive !== false}
                              >
                                <span className="sr-only">Toggle active status</span>
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    puja.isActive !== false ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </button>
                              <span className={`text-xs font-bold w-12 ${puja.isActive !== false ? "text-green-600" : "text-gray-500"}`}>
                                {puja.isActive !== false ? "Active" : "Inactive"}
                              </span>
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              <Link href={`/admin/edit-puja/${puja._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                                Edit
                              </Link>
                              <button 
                                onClick={() => handleDelete(puja._id)} 
                                className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                                title="Delete Puja"
                              >
                                <FiTrash2 />
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      )}
    </div>
  );
}
