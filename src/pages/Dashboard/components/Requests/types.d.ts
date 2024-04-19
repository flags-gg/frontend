// Define a single monthly statistic for an agent
interface Statistic {
  request: number;
  error: number;
  success: number;
  label: string;
}

// Define the structure for an agent with an ID, name, and a list of monthly statistics
interface Agent {
  id: string;
  name: string;
  stats: Statistic[];
}

// Define the top-level structure of the response containing a list of agents
interface ServerResponse {
  agents: Agent[];
}
