import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "./useTheme";
import { getAcademyDetails } from "../services/tenantService";
import { useAdminData } from "./useAdminData";
import { useLogout } from "./useLogout";
import { supabase } from "../config/supabase";

export const useStudentLayout = () => {
  const { tenantId } = useParams();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const { data: academy, isLoading: isAcademyLoading } = useQuery({
    queryKey: ["academy", tenantId],
    queryFn: () => getAcademyDetails(tenantId),
  });

  const { data: adminData, isLoading: isAdminLoading } = useAdminData();
  const { logout, isLoading: isLoggingOut } = useLogout(`/${tenantId}`);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isStudentLoggedIn = !!session;

  useEffect(() => {
    const handler = setTimeout(() => {
      const basePath = isStudentLoggedIn
        ? `/${tenantId}/my-courses`
        : `/${tenantId}`;

      if (searchQuery.trim()) {
        navigate(
          `${basePath}?search=${encodeURIComponent(searchQuery.trim())}`,
        );
      } else if (searchQuery === "" && location.search.includes("search=")) {
        navigate(basePath);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery, navigate, tenantId, location.search, isStudentLoggedIn]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isLoading = isAcademyLoading || isAuthLoading || isAdminLoading;

  return {
    tenantId,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    academy,
    adminData,
    isStudentLoggedIn,
    logout,
    isLoggingOut,
    isLoading,
  };
};
