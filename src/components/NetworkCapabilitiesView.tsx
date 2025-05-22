import React from 'react';
import styles from './NetworkCapabilitiesView.module.css'; // Import the CSS module

// Define a basic structure for the props, can be expanded later
interface NetworkCapabilitiesViewProps {
  // Props will be added as needed, e.g., for data, filters, etc.
}

// Define a placeholder data structure for table rows
interface CapabilityRow {
  id: string;
  capability: string;
  type: string;
  technology: string;
  subTechnology: string;
  dimensions: string;
  supplier: string;
  note: string;
}

const mockData: CapabilityRow[] = [
  {
    id: '1',
    capability: '3 Axis Milling',
    type: 'Machine',
    technology: 'CNC machining',
    subTechnology: 'CNC machining',
    dimensions: 'max: 1016 x 660.4 x 635 mm',
    supplier: 'Rocket Composites',
    note: 'Mostly do 3DP, ISO 9001: 2015 / AS9100 Certified working on ITAR Compliance ha blasting capabilities prefer to stay out of anodizing or other treating, have in-hou painting capabilities needed.',
  },
  {
    id: '2',
    capability: 'Vertical 5 Axis Mill',
    type: 'Machine',
    technology: 'CNC machining',
    subTechnology: 'CNC machining',
    dimensions: 'max: 508 x 508 x 762 mm',
    supplier: 'Advance Virtu',
    note: '-',
  },
  // Add more mock data rows as needed
];

const NetworkCapabilitiesView: React.FC<NetworkCapabilitiesViewProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Network capabilities</h1>
        <button className={styles.addButton}>Add capability</button>
      </div>

      {/* Search and Filters */}
      <div className={styles.controlsBar}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>&#x1F50D;</span> {/* Magnifying glass Unicode */}
          <input type="search" placeholder="Search" className={styles.searchInput} />
        </div>
        <select className={styles.filterDropdown} defaultValue="">
          <option value="" disabled>Type: None</option>
          <option value="machine">Machine</option>
        </select>
        <select className={styles.filterDropdown} defaultValue="">
          <option value="" disabled>Technology: None</option>
          <option value="cnc">CNC Machining</option>
        </select>
        <select className={styles.filterDropdown} defaultValue="">
          <option value="" disabled>Sub-technology: None</option>
          <option value="cnc-machining">CNC Machining</option>
        </select>
        <button className={styles.clearButton}>Clear all filters</button>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Capability</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Technology</th>
            <th className={styles.th}>Sub-technology</th>
            <th className={styles.th}>Dimensions</th>
            <th className={styles.th}>Supplier</th>
            <th className={styles.th}>Note</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((row) => (
            <tr key={row.id}>
              <td className={styles.td}>{row.capability}</td>
              <td className={styles.td}><span className={styles.typeBadge}>{row.type}</span></td>
              <td className={styles.td}>{row.technology}</td>
              <td className={styles.td}>{row.subTechnology}</td>
              <td className={styles.td}>{row.dimensions}</td>
              <td className={styles.td}>{row.supplier}</td>
              <td className={styles.td}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.paginationContainer}>
        <div>Showing 1 - {mockData.length} of {930 /* Placeholder total */}</div>
        <div className={styles.paginationButtons}>
          <button className={styles.paginationButton}>&#x007C;&lt;</button> {/* |< */}
          <button className={styles.paginationButton}>&lt;</button>
          <button className={styles.paginationButton}>&gt;</button>
          <button className={styles.paginationButton}>&gt;&#x007C;</button> {/* >| */}
        </div>
      </div>
    </div>
  );
};

export default NetworkCapabilitiesView; 