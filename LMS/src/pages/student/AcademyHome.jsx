import { useParams } from "react-router-dom";
import { useAcademy } from "../../hooks/useAcademy";

const AcademyHome = () => {
  const { tenantId } = useParams();
  const { data: academy, isLoading, error } = useAcademy(tenantId);

  if (isLoading) return <div>Loading Academy...</div>;
  if (error) return <div>Academy not found or Error occurred!</div>;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>{academy.academy_name}</h1>
        <p>Welcome to our academy portal</p>
      </div>

      <div className="row g-4">
        {academy.courses.map((course) => (
          <div key={course.id} className="col-md-4">
            <div className="card h-100 p-3">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="btn btn-primary">View Course</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademyHome;
