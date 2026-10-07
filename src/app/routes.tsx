import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { LandingPage } from "../pages/LandingPage";
import { OnboardingPage } from "../pages/OnboardingPage";
import { DashboardPage } from "../pages/DashboardPage";
import { GoalPage } from "../pages/GoalPage";
import { PathPage } from "../pages/PathPage";
import { SimPage } from "../pages/SimPage";
import { SimRunPage } from "../pages/SimRunPage";
import { LensPage } from "../pages/LensPage";
import { LensDetailPage } from "../pages/LensDetailPage";
import { IPOPage } from "../pages/IPOPage";
import { FnoPage } from "../pages/FnoPage";
import { PortfolioPage } from "../pages/PortfolioPage";
import { GuardPage } from "../pages/GuardPage";
import { InvestorProfilePage } from "../pages/InvestorProfilePage";
import { MissionsPage } from "../pages/MissionsPage";
import { DecisionPage } from "../pages/DecisionPage";
import { HelpPage, SettingsPage } from "../pages/SettingsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route element={<AppShell />}>
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/goal" element={<GoalPage />} />
        <Route path="/path" element={<PathPage />} />
        <Route path="/sim" element={<SimPage />} />
        <Route path="/sim/:simulationId" element={<SimRunPage />} />
        <Route path="/lens" element={<LensPage />} />
        <Route path="/lens/:conceptId" element={<LensDetailPage />} />
        <Route path="/ipo" element={<IPOPage />} />
        <Route path="/fno" element={<FnoPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/guard" element={<GuardPage />} />
        <Route path="/investor" element={<InvestorProfilePage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/decision/:assetId" element={<DecisionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
