import { useEffect, useState } from "react";

import Header from "./components/header";
import DashboardCards from "./components/dashboardcards";
import Filters from "./components/filters";
import RequestTable from "./components/requesttable";
import AssignModal from "./components/AssignModal";
import ConfirmModal from "./components/confirmmodal";
import Toast from "./components/toast";

const API_URL =
  "http://localhost:5000/api/requests";

function App() {
  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedRequest,
    setSelectedRequest] =
    useState(null);

  const [showCloseModal,
    setShowCloseModal] =
    useState(false);

  const [requestToClose,
    setRequestToClose] =
    useState(null);

  const [showToast,
    setShowToast] =
    useState(false);

  const [toastMessage,
    setToastMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [typeFilter,
    setTypeFilter] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response =
        await fetch(API_URL);

      const data =
        await response.json();

      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification =
    (message) => {
      setToastMessage(message);

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    };

  const assignProfessional =
    async (id, professional) => {
      await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            professional,
            status: "En Proceso"
          })
        }
      );

      await loadRequests();

      setSelectedRequest(null);

      showNotification(
        "Profesional asignado correctamente"
      );
    };

  const changeStatus =
    async (id) => {
      const request =
        requests.find(
          (r) => r._id === id
        );

      if (!request) return;

      const newStatus =
        request.status === "Pendiente"
          ? "En Proceso"
          : "Cerrada";

      await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      await loadRequests();

      showNotification(
        "Estado actualizado"
      );
    };

  const openCloseModal =
    (id) => {
      setRequestToClose(id);
      setShowCloseModal(true);
    };

  const confirmCloseRequest =
    async () => {
      await fetch(
        `${API_URL}/${requestToClose}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            status: "Cerrada",
            closeDate:
              new Date()
                .toLocaleDateString()
          })
        }
      );

      await loadRequests();

      setShowCloseModal(false);

      showNotification(
        "Solicitud cerrada correctamente"
      );
    };

  const reopenRequest =
    async (id) => {
      await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            status: "Pendiente",
            closeDate: null
          })
        }
      );

      await loadRequests();

      showNotification(
        "Solicitud reabierta correctamente"
      );
    };

  const filteredRequests =
    requests.filter(
      (request) => {

        const searchMatch =
          request.student
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const typeMatch =
          !typeFilter ||
          request.type === typeFilter;

        const statusMatch =
          !statusFilter ||
          request.status ===
            statusFilter;

        return (
          searchMatch &&
          typeMatch &&
          statusMatch
        );
      }
    );

  if (loading) {
    return (
      <h1 className="p-6">
        Cargando...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <main className="max-w-7xl mx-auto p-6">

        <DashboardCards
          requests={requests}
        />

        <Filters
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={
            setStatusFilter
          }
        />

        <RequestTable
          requests={filteredRequests}
          onAssign={
            setSelectedRequest
          }
          onChangeStatus={
            changeStatus
          }
          onCloseRequest={
            openCloseModal
          }
          onReopen={
            reopenRequest
          }
        />

      </main>

      {selectedRequest && (
        <AssignModal
          request={selectedRequest}
          onClose={() =>
            setSelectedRequest(
              null
            )
          }
          onSave={
            assignProfessional
          }
        />
      )}

      {showCloseModal && (
        <ConfirmModal
          title="Cerrar Solicitud"
          message="¿Está seguro de cerrar esta solicitud?"
          onConfirm={
            confirmCloseRequest
          }
          onCancel={() =>
            setShowCloseModal(
              false
            )
          }
        />
      )}

      {showToast && (
        <Toast
          message={toastMessage}
        />
      )}
    </div>
  );
}

export default App;