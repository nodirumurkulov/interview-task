// Represents the full API response structure
export interface SampleData {
    results: Issue[];
  }
  
  export interface Issue {
    id: number;
    created: string; // ISO date string
    updated: string; // ISO date string
    due: string; // ISO date string
    status: "open" | "pending" | "closed" | "solved" | "hold" | "new";
    type: "problem" | "question" | "task" | "incident";
    priority: "high" | "medium" | "low" | "normal";
    assignee_id: string;
    subject: string;
    satisfaction_rating: {
      score: "good" | "bad";
    };
    organization_id: string;
    via: {
      channel: string;
      source: {
        from: {
          name: string;
          email: string;
        };
      };
    };
    ticket_form_id: string;
  }
  