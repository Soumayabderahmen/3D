import { useParams } from "react-router-dom";
import { getService } from "@/data/services";
import { getStoredSubServices } from "@/hooks/useServicesData";
import SubServiceDetail from "./SubServiceDetail";
import ZonePage from "./ZonePage";

/**
 * Router component that determines whether the second URL segment
 * is a sub-service slug or a zone slug, and renders the appropriate page.
 */
const ServiceSubRoute = () => {
  const { serviceSlug, subSlug } = useParams<{ serviceSlug: string; subSlug: string }>();
  const service = getService(serviceSlug || "");

  if (service) {
    const storedSubs = getStoredSubServices(service.slug);
    const isSubService = storedSubs.some((s) => s.slug === subSlug);
    if (isSubService) {
      return <SubServiceDetail />;
    }
  }

  return <ZonePage />;
};

export default ServiceSubRoute;
