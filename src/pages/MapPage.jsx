import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '../components/common/Button.jsx';
import { useEmployeeContext } from '../context/EmployeeContext.jsx';
import { getEmployeeCity, getEmployeeName } from '../utils/employeeUtils.js';

// Fix default marker icons in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

// Map page; attempts to plot markers when coordinates exist.
// If API does not provide lat/lng, shows a helpful message.
const MapPage = () => {
  const { employees } = useEmployeeContext();
  const navigate = useNavigate();

  const markers = useMemo(() => {
    if (!employees || !employees.length) return [];

    return employees
      .map((emp, index) => {
        const lat =
          Number(emp.lat ?? emp.latitude ?? emp.latitute ?? emp.lat_val);
        const lng =
          Number(emp.lng ?? emp.longitude ?? emp.longitute ?? emp.lng_val);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

        return {
          id: index,
          name: getEmployeeName(emp, index),
          city: getEmployeeCity(emp),
          position: [lat, lng]
        };
      })
      .filter(Boolean);
  }, [employees]);

  const center = markers[0]?.position || [20.5937, 78.9629]; // India center as fallback
  const hasCoordinates = markers.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Employee Map
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Visualize employees by location on an interactive map.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/list')}>
          Back to List
        </Button>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700/70 h-[420px] bg-slate-100 dark:bg-slate-900/60">
        {employees && employees.length > 0 ? (
          hasCoordinates ? (
            <MapContainer
              center={center}
              zoom={4}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers.map((m) => (
                <Marker key={m.id} position={m.position}>
                  <Popup>
                    <div className="text-xs">
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-slate-600">{m.city}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-slate-500 dark:text-slate-300 px-4 text-center">
              Location fields were not found in the API response (e.g.
              latitude/longitude). Once the backend provides coordinates, this
              map will automatically show markers for each employee.
            </div>
          )
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-slate-500 dark:text-slate-300 px-4 text-center">
            No employee data available. Please open the list page first to load
            data.
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;

