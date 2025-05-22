import React, { useState } from 'react';

// Define a basic structure for the props, can be expanded later
interface RFQManagementViewProps {
  // Props will be added as needed
}

// Define data structures for rfq table rows
interface RFQRow {
  id: string;
  notes: boolean;
  isLocalSourcing: boolean;
  firstName: string;
  priority: 'High' | 'Normal';
  salesOwner: string;
  technology: string;
  ongoingSince: string;
  hoursOngoing: number;
  requests: number;
  response: number;
}

// Define data structures for response table rows
interface ResponseRow {
  id: string;
  supplierName: string;
  docNumber: string;
  answerMargin: string;
  answerShipDate: string;
  totalOrder: string;
  leadTime: string;
  responseType: string;
  ticket: string;
}

// Mock data for RFQ rows
const mockRFQData: RFQRow[] = [
  {
    id: '1',
    notes: true,
    isLocalSourcing: false,
    firstName: 'Naveen Ku...',
    priority: 'High',
    salesOwner: 'Enrico',
    technology: 'CNC Machining',
    ongoingSince: 'May 21, 2025 7:...',
    hoursOngoing: 0,
    requests: 0,
    response: 0
  },
  {
    id: '2',
    notes: true,
    isLocalSourcing: false,
    firstName: 'Werko',
    priority: 'Normal',
    salesOwner: 'Brigitte',
    technology: 'Sheet Metal',
    ongoingSince: 'May 21, 2025 5:...',
    hoursOngoing: 1,
    requests: 0,
    response: 0
  },
  {
    id: '3',
    notes: true,
    isLocalSourcing: false,
    firstName: 'Werko',
    priority: 'Normal',
    salesOwner: 'Flavien',
    technology: 'Sheet Metal',
    ongoingSince: 'May 21, 2025 5:...',
    hoursOngoing: 2,
    requests: 0,
    response: 0
  },
  {
    id: '4',
    notes: true,
    isLocalSourcing: true,
    firstName: 'Arief',
    priority: 'Normal',
    salesOwner: 'Thomas',
    technology: 'CNC Machining',
    ongoingSince: 'May 21, 2025 4:...',
    hoursOngoing: 2,
    requests: 3,
    response: 0
  },
  {
    id: '5',
    notes: true,
    isLocalSourcing: true,
    firstName: 'Adarsha',
    priority: 'Normal',
    salesOwner: 'Karim',
    technology: 'CNC Machining',
    ongoingSince: 'May 21, 2025 4:...',
    hoursOngoing: 3,
    requests: 42,
    response: 0
  },
  {
    id: '6',
    notes: true,
    isLocalSourcing: false,
    firstName: 'Adarsha',
    priority: 'Normal',
    salesOwner: 'Dominik',
    technology: 'CNC Machining',
    ongoingSince: 'May 21, 2025 7:...',
    hoursOngoing: 0,
    requests: 0,
    response: 0
  },
  {
    id: '7',
    notes: true,
    isLocalSourcing: true,
    firstName: 'Hemanth',
    priority: 'Normal',
    salesOwner: 'Aaron',
    technology: 'Injection Mol...',
    ongoingSince: 'Dec 31, 1969 6:...',
    hoursOngoing: 485508,
    requests: 72,
    response: 0
  }
];

// Mock data for response rows
const mockResponseData: ResponseRow[] = [
  {
    id: '1',
    supplierName: 'Alpha Manufacturing',
    docNumber: 'DOC-2351',
    answerMargin: '15%',
    answerShipDate: '06/15/2025',
    totalOrder: '$4,250.00',
    leadTime: '14 days',
    responseType: 'Complete',
    ticket: 'supplier_rfq'
  }
];

const RFQManagementView: React.FC<RFQManagementViewProps> = (props) => {
  // State for tracking selected dropdown value
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isHighPriority, setIsHighPriority] = useState<boolean>(false);
  
  // State for current tab
  const [activeTab, setActiveTab] = useState<'requests' | 'manual' | 'poNeeded' | 'poComplete'>('requests');
  
  // Basic styles
  const styles = {
    container: {
      padding: '0',
      background: '#fff',
      minHeight: '100%',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    headerTitle: {
      fontSize: '32px',
      fontWeight: 600,
      color: '#333',
      margin: '0',
      textAlign: 'center' as const,
      width: '100%'
    },
    usefulLinks: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    linkDropdown: {
      padding: '8px 12px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      width: '250px',
    },
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    dropdown: {
      padding: '8px 16px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      width: '200px',
    },
    checkbox: {
      marginLeft: '16px',
    },
    tabContainer: {
      display: 'flex',
      marginBottom: '16px',
      borderBottom: '1px solid #eee',
    },
    tab: {
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: 500,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      position: 'relative' as const,
    },
    activeTab: {
      borderBottom: '2px solid #007BFF',
      backgroundColor: '#e6f0ff',
      color: '#007BFF',
      borderRadius: '5px 5px 0 0',
    },
    tabBadge: {
      backgroundColor: '#e6f0ff',
      color: '#007BFF',
      borderRadius: '50%',
      padding: '3px 8px',
      fontSize: '12px',
      marginLeft: '8px',
    },
    refreshButton: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginBottom: '24px',
      fontSize: '14px',
      backgroundColor: '#000',
      color: 'white',
    },
    thead: {
      backgroundColor: '#000',
    },
    th: {
      padding: '12px 8px',
      textAlign: 'left' as const,
      fontWeight: 500,
    },
    td: {
      padding: '12px 8px',
      textAlign: 'left' as const,
      backgroundColor: '#fff',
      color: '#333',
      borderBottom: '1px solid #f0f0f0',
    },
    notesButton: {
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '0px',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'center' as const,
      whiteSpace: 'nowrap' as const,
    },
    priorityPill: {
      display: 'inline-block',
      padding: '5px 12px',
      borderRadius: '20px',
      fontWeight: 500,
      fontSize: '13px',
    },
    highPriority: {
      backgroundColor: '#f8e3e3',
      color: '#c53030',
    },
    normalPriority: {
      backgroundColor: '#e6eeff',
      color: '#3182ce',
    },
    technologyPill: {
      display: 'inline-block',
      padding: '5px 12px',
      borderRadius: '20px',
      fontWeight: 500,
      fontSize: '13px',
      backgroundColor: '#e6f7ff',
      color: '#0e7490',
    },
    section: {
      marginBottom: '30px',
    },
    sectionTitle: {
      fontWeight: 600,
      marginBottom: '16px',
      fontSize: '24px',
    },
    resultsCount: {
      margin: '16px 0',
      color: '#666',
      fontSize: '14px',
    },
    paginationContainer: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    paginationButton: {
      padding: '5px 10px',
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  // Tab data counts
  const tabCounts = {
    requests: 167,
    manual: 8,
    poNeeded: 0,
    poComplete: 0,
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.headerTitle}>RFQ Management System</h1>
      
      {/* Useful Links section */}
      <div style={styles.usefulLinks}>
        <div></div> {/* Empty div for spacing */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <select style={styles.linkDropdown} value="useful" onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="useful">Useful links ⭐</option>
            <option value="link1">HubSpot Dashboard</option>
            <option value="link2">Supplier Database</option>
            <option value="link3">Knowledge Base</option>
          </select>
          <span style={{marginLeft: '5px'}}>▼</span>
        </div>
      </div>
      
      {/* Filter and Options section */}
      <div style={styles.filterContainer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <select style={styles.dropdown} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Select an option</option>
            <option value="option1">Sort by Date</option>
            <option value="option2">Sort by Priority</option>
            <option value="option3">Sort by Name</option>
          </select>
          <label style={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={isHighPriority} 
              onChange={() => setIsHighPriority(!isHighPriority)} 
            /> High Priority Only
          </label>
        </div>
      </div>
      
      {/* Tabs and Refresh Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={styles.tabContainer}>
          <button 
            onClick={() => setActiveTab('requests')} 
            style={{...styles.tab, ...(activeTab === 'requests' ? styles.activeTab : {})}}
          >
            RFQ requests <span style={styles.tabBadge}>{tabCounts.requests}</span>
          </button>
          <button 
            onClick={() => setActiveTab('manual')} 
            style={{...styles.tab, ...(activeTab === 'manual' ? styles.activeTab : {})}}
          >
            Manual Sourcing Needed <span style={styles.tabBadge}>{tabCounts.manual}</span>
          </button>
          <button 
            onClick={() => setActiveTab('poNeeded')} 
            style={{...styles.tab, ...(activeTab === 'poNeeded' ? styles.activeTab : {})}}
          >
            PO Check Needed <span style={styles.tabBadge}>{tabCounts.poNeeded}</span>
          </button>
          <button 
            onClick={() => setActiveTab('poComplete')} 
            style={{...styles.tab, ...(activeTab === 'poComplete' ? styles.activeTab : {})}}
          >
            PO Check Complete
          </button>
        </div>
        <button style={styles.refreshButton}>Refresh Hubspot</button>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>In Review Ongoing</h2>
        
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Notes</th>
              <th style={styles.th}>Is local sourcing</th>
              <th style={styles.th}>First name</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Sales owner</th>
              <th style={styles.th}>Technology</th>
              <th style={styles.th}>Ongoing since</th>
              <th style={styles.th}>Hours Ongoing</th>
              <th style={styles.th}>Requests</th>
              <th style={styles.th}>Response</th>
            </tr>
          </thead>
          <tbody>
            {mockRFQData.map((row) => (
              <tr key={row.id}>
                <td style={styles.td}>
                  <button style={styles.notesButton}>
                    Open Notes (0)
                  </button>
                </td>
                <td style={styles.td}>{row.isLocalSourcing && 'false'}</td>
                <td style={styles.td}>{row.firstName}</td>
                <td style={styles.td}>
                  <span 
                    style={{
                      ...styles.priorityPill, 
                      ...(row.priority === 'High' ? styles.highPriority : styles.normalPriority)
                    }}
                  >
                    {row.priority}
                  </span>
                </td>
                <td style={styles.td}>{row.salesOwner}</td>
                <td style={styles.td}>
                  <span style={styles.technologyPill}>
                    {row.technology}
                  </span>
                </td>
                <td style={styles.td}>{row.ongoingSince}</td>
                <td style={styles.td}>{row.hoursOngoing}</td>
                <td style={styles.td}>{row.requests}</td>
                <td style={styles.td}>{row.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={styles.resultsCount}>167 results</div>
          <div style={styles.paginationContainer}>
            <button style={styles.paginationButton}>
              <span>🔍</span>
            </button>
            <button style={styles.paginationButton}>
              <span>↻</span>
            </button>
          </div>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Responses</h2>
        
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Supplier name</th>
              <th style={styles.th}>Doc number</th>
              <th style={styles.th}>Answer margin</th>
              <th style={styles.th}>Answer ship date</th>
              <th style={styles.th}>Total order</th>
              <th style={styles.th}>Lead time</th>
              <th style={styles.th}>Response type</th>
              <th style={styles.th}>Ticket</th>
            </tr>
          </thead>
          <tbody>
            {mockResponseData.map((row) => (
              <tr key={row.id}>
                <td style={styles.td}>{row.supplierName}</td>
                <td style={styles.td}>{row.docNumber}</td>
                <td style={styles.td}>{row.answerMargin}</td>
                <td style={styles.td}>{row.answerShipDate}</td>
                <td style={styles.td}>{row.totalOrder}</td>
                <td style={styles.td}>{row.leadTime}</td>
                <td style={styles.td}>{row.responseType}</td>
                <td style={styles.td}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: '#4CAF50',
                      marginRight: '8px'
                    }}></span>
                    {row.ticket}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RFQManagementView;