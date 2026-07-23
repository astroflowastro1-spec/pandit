"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiMove } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export default function AdminDashboard() {
  const [Chadhavas, setChadhavas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chadhava")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setChadhavas(data.data);
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
    const reorderedChadhavas = Array.from(Chadhavas);
    const [removed] = reorderedChadhavas.splice(sourceIndex, 1);
    reorderedChadhavas.splice(destinationIndex, 0, removed);
    setChadhavas(reorderedChadhavas);

    // Save to backend
    const orderedIds = reorderedChadhavas.map((p) => p._id);
    try {
      await fetch("/api/chadhava/reorder", {
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
      const res = await fetch(`/api/chadhava/${id}/toggle`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setChadhavas(Chadhavas.map((p) => (p._id === id ? { ...p, isActive: !currentStatus } : p)));
      } else {
        alert("Failed to toggle status");
      }
    } catch (err) {
      console.error(err);
      alert("Error toggling status");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chadhavas Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage all your online Chadhavas here. Drag to reorder.</p>
        </div>
        <Link
          href="/admin/add-chadhava"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <FiPlus />
          Add New Chadhava
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading Chadhavas...</div>
      ) : Chadhavas.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPlus className="text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Chadhavas found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first online Chadhava offering.</p>
          <Link
            href="/admin/add-chadhava"
            className="text-blue-600 font-medium hover:underline"
          >
            Add your first Chadhava &rarr;
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
              <Droppable droppableId="Chadhavas-list">
                {(provided) => (
                  <tbody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {Chadhavas.map((Chadhava, index) => (
                      <Draggable key={Chadhava._id} draggableId={Chadhava._id} index={index}>
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
                              <p className="font-semibold text-gray-900 line-clamp-1">{Chadhava.title}</p>
                              <p className="text-xs text-pink-600 mt-1 uppercase tracking-wider font-bold">
                                {Chadhava.redSubtitle}
                              </p>
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{Chadhava.location}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{Chadhava.date}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                              <button
                                onClick={() => handleToggleActive(Chadhava._id, Chadhava.isActive !== false)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                                  Chadhava.isActive !== false ? "bg-green-500" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                                role="switch"
                                aria-checked={Chadhava.isActive !== false}
                              >
                                <span className="sr-only">Toggle active status</span>
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    Chadhava.isActive !== false ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </button>
                              <span className={`text-xs font-bold w-12 ${Chadhava.isActive !== false ? "text-green-600" : "text-gray-500"}`}>
                                {Chadhava.isActive !== false ? "Active" : "Inactive"}
                              </span>
                              <Link href={`/admin/edit-chadhava/${Chadhava._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-2">
                                Edit
                              </Link>
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
