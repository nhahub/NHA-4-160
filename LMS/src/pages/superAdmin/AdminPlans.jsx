import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaPlus,
  FaPen,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { usePlansPaginated, useManagePlans } from "../../hooks/useSuperAdmin";
import Modal from "../../components/Modal";

const inputStyle = {
  backgroundColor: "var(--color-grey-50)",
  color: "var(--color-grey-900)",
  borderColor: "var(--color-grey-300)",
};

const PlanModal = ({ isOpen, onClose, plan }) => {
  const { addMutation, updateMutation } = useManagePlans();
  const isEditing = !!plan;

  const { register, handleSubmit, reset } = useForm({
    values: {
      id: plan?.id ?? "",
      name: plan?.name ?? "",
      price: plan?.price ?? "",
      duration_months: plan?.duration_months ?? "",
      courses_limit: plan?.courses_limit ?? "",
      features: plan?.features ? plan.features.join(", ") : "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      id: data.id,
      name: data.name,
      price: Number(data.price),
      duration_months: Number(data.duration_months),
      courses_limit: Number(data.courses_limit),
      features: data.features
        ? data.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        : [],
    };

    if (isEditing) {
      updateMutation.mutate(
        { id: plan.id, updates: payload },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    } else {
      addMutation.mutate(payload, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <Modal
      title={isEditing ? "Edit Plan" : "Add Plan"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3"
      >
        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Plan ID
          </label>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            disabled={isEditing}
            {...register("id", { required: true })}
          />
        </div>
        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            style={inputStyle}
            {...register("name", { required: true })}
          />
        </div>
        <div className="row g-3">
          <div className="col-4">
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Price
            </label>
            <input
              type="number"
              className="form-control"
              style={inputStyle}
              {...register("price", { required: true })}
            />
          </div>
          <div className="col-4">
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Months
            </label>
            <input
              type="number"
              className="form-control"
              style={inputStyle}
              {...register("duration_months", { required: true })}
            />
          </div>
          <div className="col-4">
            <label
              className="form-label fw-semibold"
              style={{ color: "var(--color-grey-700)" }}
            >
              Courses Limit
            </label>
            <input
              type="number"
              className="form-control"
              style={inputStyle}
              {...register("courses_limit", { required: true })}
            />
          </div>
        </div>
        <div>
          <label
            className="form-label fw-semibold"
            style={{ color: "var(--color-grey-700)" }}
          >
            Features (comma separated)
          </label>
          <textarea
            className="form-control"
            rows="2"
            style={inputStyle}
            placeholder="e.g. 5 Courses, Basic Support, Certificate"
            {...register("features")}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="btn w-100 fw-bold mt-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px",
          }}
        >
          {isPending ? "Saving..." : "Save Plan"}
        </button>
      </form>
    </Modal>
  );
};

const AdminPlans = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = usePlansPaginated(page, limit);
  const { deleteMutation } = useManagePlans();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const plans = data?.data || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const openAdd = () => {
    setEditTarget(null);
    setIsModalOpen(true);
  };
  const openEdit = (plan) => {
    setEditTarget(plan);
    setIsModalOpen(true);
  };

  if (isLoading)
    return (
      <div style={{ color: "var(--color-grey-700)" }}>Loading plans...</div>
    );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0" style={{ color: "var(--color-grey-900)" }}>
          Subscription Plans
        </h2>
        <button
          onClick={openAdd}
          className="btn fw-bold d-flex align-items-center gap-2"
          style={{
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            padding: "10px 18px",
          }}
        >
          <FaPlus /> Add Plan
        </button>
      </div>

      <div
        className="rounded-3 overflow-hidden"
        style={{
          backgroundColor: "var(--color-grey-0)",
          border: "1px solid var(--color-grey-200)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="table m-0 align-middle">
          <thead>
            <tr style={{ backgroundColor: "var(--color-grey-50)" }}>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Name
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Price
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Duration
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Limit
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Features
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr
                key={plan.id}
                style={{
                  borderTop: "1px solid var(--color-grey-200)",
                  backgroundColor: "var(--color-grey-0)",
                }}
              >
                <td
                  className="p-3 border-0 fw-semibold"
                  style={{
                    color: "var(--color-grey-900)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {plan.name}
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  ${plan.price}
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {plan.duration_months} Months
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {plan.courses_limit} Courses
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  <div className="d-flex flex-wrap gap-1">
                    {plan.features?.map((f, i) => (
                      <span
                        key={i}
                        className="badge"
                        style={{
                          backgroundColor: "var(--color-grey-100)",
                          color: "var(--color-grey-700)",
                          fontWeight: 500,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </td>
                <td
                  className="p-3 text-end border-0"
                  style={{ backgroundColor: "var(--color-grey-0)" }}
                >
                  <button
                    onClick={() => openEdit(plan)}
                    className="btn btn-sm me-2"
                    style={{
                      border: "1px solid var(--color-grey-300)",
                      color: "var(--color-grey-700)",
                    }}
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(plan.id)}
                    className="btn btn-sm"
                    style={{
                      border: "1px solid var(--color-grey-300)",
                      color: "#dc2626",
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-sm d-flex align-items-center gap-2"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-300)",
              color: "var(--color-grey-700)",
            }}
          >
            <FaChevronLeft /> Prev
          </button>
          <span
            className="small fw-semibold"
            style={{ color: "var(--color-grey-600)" }}
          >
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-sm d-flex align-items-center gap-2"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-300)",
              color: "var(--color-grey-700)",
            }}
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}

      <PlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={editTarget}
      />
    </div>
  );
};

export default AdminPlans;
