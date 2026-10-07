import { concepts } from "../data/concepts";
import { demoGoal } from "../data/goals";
import { marketEvents } from "../data/marketEvents";
import { missions } from "../data/missions";
import { paths } from "../data/paths";
import { demoHoldings } from "../data/portfolio";
import { simulations, simulationById } from "../data/simulations";
import { demoUser } from "../data/user";
import { novaIpo } from "../data/ipo";
import type { Concept } from "../types/concept";
import type { Simulation } from "../types/simulation";

const delay = (ms = 380) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getUser() {
    await delay();
    return demoUser;
  },
  async getGoal() {
    await delay(320);
    return demoGoal;
  },
  async getPaths() {
    await delay(280);
    return paths;
  },
  async getPortfolio() {
    await delay();
    const invested = demoHoldings.reduce((s, h) => s + h.invested, 0);
    const total = demoHoldings.reduce((s, h) => s + h.current, 0);
    return { holdings: demoHoldings, invested, total, returns: total - invested };
  },
  async getConcept(id: string): Promise<Concept | undefined> {
    await delay(260);
    return concepts.find((c) => c.id === id);
  },
  async getConcepts() {
    await delay(240);
    return concepts;
  },
  async getSimulation(id: string): Promise<Simulation | undefined> {
    await delay(300);
    return simulationById[id];
  },
  async getSimulations() {
    await delay(280);
    return simulations;
  },
  async getMissions() {
    await delay(250);
    return missions;
  },
  async getInvestorDNA() {
    await delay();
    return { knowledge: null, behavior: null };
  },
  async getMarketEvent() {
    await delay(220);
    return marketEvents[2];
  },
  async getIpo() {
    await delay(300);
    return novaIpo;
  },
};
