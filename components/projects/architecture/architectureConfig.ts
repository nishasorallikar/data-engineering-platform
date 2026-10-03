export type ArchitectureLayer = "source" | "ingestion" | "bronze" | "silver" | "gold" | "serving";

export type ArchitectureNode = {
  id: string;
  label: string;
  layer: ArchitectureLayer;
  technology?: string;
  description?: string;
};

export type ArchitectureConnection = {
  from: string;
  to: string;
  mode?: string;
  label?: string;
};

export const voltgridNodes: ArchitectureNode[] = [
  // SOURCE
  { id: "src_iot", label: "IoT Charger Telemetry", layer: "source", technology: "OCPP / JSON stream", description: "Near real-time (1-3 sec) streams from chargers." },
  { id: "src_batch", label: "Enterprise Batch Sources", layer: "source", technology: "CSV / XML", description: "Daily/Weekly extracts from CRM, Master Data, Sessions, Complaints." },
  { id: "src_api", label: "External APIs", layer: "source", technology: "REST", description: "Payment Gateway, Fleet Usage, Weather." },
  { id: "src_pdf", label: "Invoice PDFs", layer: "source", technology: "PDF / Email", description: "Invoices received as email attachments." },

  // INGESTION
  { id: "ing_eventhub", label: "Event Hubs Streaming", layer: "ingestion", technology: "Azure IoT Hub / Event Hubs", description: "High-throughput streaming ingestion." },
  { id: "ing_adf", label: "Data Factory Load", layer: "ingestion", technology: "Azure Data Factory", description: "Parameterised pipelines, REST connectors." },
  { id: "ing_logicapp", label: "Doc Intelligence Pipeline", layer: "ingestion", technology: "Logic Apps / Blob / AI", description: "PDF extraction via Azure AI Document Intelligence." },

  // BRONZE
  { id: "bz_lake", label: "Bronze Raw Zone", layer: "bronze", technology: "ADLS Gen2 / Delta Lake", description: "Immutable raw replica, source-date partitioned." },

  // SILVER
  { id: "sv_lake", label: "Silver Cleansed Zone", layer: "silver", technology: "ADLS Gen2 / Databricks", description: "Cleansed, deduplicated, SCD2 applied, DQ verified." },

  // GOLD
  { id: "go_lake", label: "Gold Curated Zone", layer: "gold", technology: "ADLS Gen2 / Delta Lake", description: "Business-ready analytical model (Star Schema)." },

  // SERVING
  { id: "srv_synapse", label: "Synapse Analytics", layer: "serving", technology: "Azure Synapse", description: "Serverless and dedicated SQL pools for analytics." },
  { id: "srv_pbi", label: "Power BI Dashboards", layer: "serving", technology: "Power BI", description: "DirectQuery/Import with RLS for Franchise Owners." },
  { id: "srv_cosmos", label: "Cosmos DB Operational", layer: "serving", technology: "Azure Cosmos DB", description: "Low-latency reads for fleet web/mobile APIs." },
];

export const voltgridConnections: ArchitectureConnection[] = [
  { from: "src_iot", to: "ing_eventhub", mode: "Streaming" },
  { from: "src_batch", to: "ing_adf", mode: "Batch" },
  { from: "src_api", to: "ing_adf", mode: "REST" },
  { from: "src_pdf", to: "ing_logicapp", mode: "Event-driven" },

  { from: "ing_eventhub", to: "bz_lake", mode: "Structured Streaming" },
  { from: "ing_adf", to: "bz_lake", mode: "Copy Activity" },
  { from: "ing_logicapp", to: "bz_lake", mode: "JSON Drop" },

  { from: "bz_lake", to: "sv_lake", mode: "Databricks Batch/Stream" },
  { from: "sv_lake", to: "go_lake", mode: "Databricks DLT" },

  { from: "go_lake", to: "srv_synapse", mode: "External Tables" },
  { from: "go_lake", to: "srv_pbi", mode: "DirectQuery / Import" },
  { from: "go_lake", to: "srv_cosmos", mode: "Data Sync" },
];
