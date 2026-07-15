import { useState } from "react";
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  useTenantsPaginated,
  useManageTenants,
} from "../../hooks/useSuperAdmin";

const AdminTenants = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useTenantsPaginated(page, limit);
  console.log(data);
  const { deleteMutation } = useManageTenants();

  const tenants = data?.data || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  if (isLoading)
    return (
      <div style={{ color: "var(--color-grey-700)" }}>Loading tenants...</div>
    );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0" style={{ color: "var(--color-grey-900)" }}>
          Registered Academies
        </h2>
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
                Tenant ID
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Academy Name
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Admin
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Plan
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
            {tenants.map((tenant) => (
              <tr
                key={tenant.id}
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
                  {tenant.id}
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {tenant.academy_name}
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {tenant.users?.name} <br />{" "}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-grey-400)",
                    }}
                  >
                    {tenant.users?.email}
                  </span>
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  <span
                    className="badge rounded-pill"
                    style={{
                      backgroundColor: "var(--color-brand-50)",
                      color: "var(--color-brand-700)",
                    }}
                  >
                    {tenant.plans?.name || "Free"}
                  </span>
                </td>
                <td
                  className="p-3 text-end border-0"
                  style={{ backgroundColor: "var(--color-grey-0)" }}
                >
                  <button
                    onClick={() => deleteMutation.mutate(tenant.id)}
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
    </div>
  );
};

export default AdminTenants;
