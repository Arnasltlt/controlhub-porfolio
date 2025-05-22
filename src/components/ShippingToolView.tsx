import React, { useState } from 'react';

interface ShippingToolViewProps {
  // Props can be added as needed
}

const ShippingToolView: React.FC<ShippingToolViewProps> = () => {
  const [crossDockMode, setCrossDockMode] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [testMode, setTestMode] = useState(false);

  // Styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      padding: '0',
      height: '100%',
      display: 'flex' as const,
      flexDirection: 'column' as const,
    },
    tabsContainer: {
      display: 'flex' as const,
      borderBottom: '1px solid #ddd',
      marginBottom: '15px',
    },
    tab: {
      padding: '8px 20px',
      backgroundColor: '#e6f2ff',
      border: 'none',
      borderRight: '1px solid #ddd',
      fontSize: '14px',
      cursor: 'pointer',
    },
    activeTab: {
      backgroundColor: '#0084ff',
      color: 'white',
    },
    inactiveTab: {
      backgroundColor: '#f0f0f0',
      color: '#666',
    },
    searchContainer: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center',
      padding: '15px 0',
      marginBottom: '20px',
    },
    shippingElsewhereContainer: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center',
      marginBottom: '10px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: 'white',
      color: '#333',
    },
    searchButton: {
      padding: '10px 15px',
      backgroundColor: '#0084ff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      marginLeft: '10px',
      cursor: 'pointer',
    },
    switchContainer: {
      display: 'flex' as const,
      alignItems: 'center',
      margin: '10px 0',
    },
    switchLabel: {
      marginLeft: '10px',
      fontSize: '14px',
    },
    switch: {
      position: 'relative' as const,
      display: 'inline-block' as const,
      width: '60px',
      height: '30px',
    },
    slider: {
      position: 'absolute' as const,
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: crossDockMode ? '#2196F3' : '#ccc',
      transition: '.4s',
      borderRadius: '34px',
    },
    sliderBefore: {
      position: 'absolute' as const,
      content: '""',
      height: '22px',
      width: '22px',
      left: crossDockMode ? '33px' : '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '.4s',
      borderRadius: '50%',
    },
    title: {
      fontSize: '24px',
      margin: '0 0 20px 0',
      textAlign: 'center' as const,
    },
    warehouseSection: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      padding: '20px',
      marginBottom: '20px',
      minHeight: '200px',
      display: 'flex' as const,
      alignItems: 'center',
      justifyContent: 'center' as const,
      color: '#999',
      fontSize: '16px',
    },
    statusRow: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center',
      marginBottom: '20px',
    },
    statusContainer: {
      display: 'flex' as const,
      alignItems: 'center',
    },
    orderNumber: {
      fontWeight: 'bold' as const,
      marginRight: '15px',
    },
    statusTag: {
      padding: '6px 12px',
      borderRadius: '4px',
      color: 'white',
      fontSize: '14px',
      display: 'inline-block',
    },
    conformingStatus: {
      backgroundColor: '#00a651',
    },
    lateTag: {
      color: '#ff5722',
      marginLeft: '10px',
      display: 'flex' as const,
      alignItems: 'center',
    },
    lateCircle: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#ff5722',
      marginRight: '5px',
    },
    reporterButton: {
      padding: '8px 15px',
      backgroundColor: '#ff8a80',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    formSection: {
      display: 'grid' as const,
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px',
    },
    formColumn: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
    },
    formTitle: {
      fontSize: '18px',
      fontWeight: 'bold' as const,
      margin: '0 0 15px 0',
    },
    formGroup: {
      marginBottom: '15px',
      display: 'flex' as const,
      flexDirection: 'column' as const,
    },
    formLabel: {
      fontSize: '14px',
      marginBottom: '5px',
    },
    dimensionsSection: {
      marginTop: '20px',
    },
    dimensionsGrid: {
      display: 'grid' as const,
      gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr',
      gap: '10px',
      marginBottom: '10px',
    },
    dimensionsHeader: {
      fontSize: '14px',
      fontWeight: 'normal' as const,
      textAlign: 'center' as const,
      padding: '5px',
    },
    dimensionsInput: {
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: 'white',
      color: '#333',
    },
    boxSelector: {
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: 'white',
    },
  };

  return (
    <div style={styles.container}>
      {/* Tabs */}
      <div style={styles.tabsContainer}>
        <button 
          style={{
            ...styles.tab,
            ...styles.activeTab,
          }}
        >
          UPS Shipments
        </button>
        <button
          style={{
            ...styles.tab,
            ...styles.inactiveTab,
          }}
        >
          Search Previously Created Labels
        </button>
        <button
          style={{
            ...styles.tab,
            ...styles.inactiveTab,
          }}
        >
          Orders On Hold (98)
        </button>
        <button
          style={{
            ...styles.tab,
            ...styles.inactiveTab,
          }}
        >
          Hold Updated (5)
        </button>
      </div>

      {/* Cross Dock Mode Toggle */}
      <div style={styles.switchContainer}>
        <div style={styles.switch} onClick={() => setCrossDockMode(!crossDockMode)}>
          <div style={styles.slider}>
            <div style={styles.sliderBefore}></div>
          </div>
        </div>
        <span style={styles.switchLabel}>Cross dock mode</span>
        
        {/* Test Mode Toggle - positioned on the right */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            checked={testMode} 
            onChange={() => setTestMode(!testMode)}
            id="test-mode-checkbox"
          />
          <label htmlFor="test-mode-checkbox" style={{ marginLeft: '5px' }}>
            Test mode
          </label>
        </div>
      </div>

      {/* Shipping Somewhere Else */}
      <div style={styles.shippingElsewhereContainer}>
        <div>Shipping Somewhere Else?</div>
      </div>

      {/* Warehouse Title */}
      <h1 style={styles.title}>Robowarehouse V4 (UPS)</h1>

      {/* Search Order Row */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <span style={{ width: '120px', paddingTop: '10px' }}>Search value</span>
        <input 
          type="text" 
          style={{ ...styles.input, flex: 1 }}
          placeholder="Tracking, order number, etc."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button style={styles.searchButton}>Search order</button>
      </div>

      {/* Order Status Row */}
      <div style={styles.statusRow}>
        <div style={styles.statusContainer}>
          <span style={styles.orderNumber}>Order **** NC Status:</span>
          <span style={{ ...styles.statusTag, ...styles.conformingStatus }}>Conforming</span>
          <span style={styles.lateTag}>
            <span style={styles.lateCircle}></span>
            Late
          </span>
        </div>
        <button style={styles.reporterButton}>Open NC Reporter</button>
      </div>

      <div>Ship-by date:</div>

      {/* Warehouse Messages Section */}
      <div style={styles.warehouseSection}>
        No warehouse messages found :)
      </div>

      {/* Shipping Form Sections */}
      <div style={styles.formSection}>
        {/* Origin Section */}
        <div style={styles.formColumn}>
          <h3 style={styles.formTitle}>Origin</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Company</label>
            <input type="text" style={styles.input} defaultValue="Protolabs Network" />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Contact</label>
            <input type="text" style={styles.input} defaultValue="Shipping Manager" />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input type="text" style={styles.input} defaultValue="logistics@protolabs.com" />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone</label>
            <input type="text" style={styles.input} defaultValue="+13129457541" />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address line 1</label>
            <input type="text" style={styles.input} defaultValue="2071N Southport Ave" />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address line 2</label>
            <input type="text" style={styles.input} defaultValue="Suite 104" />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>City</label>
            <input type="text" style={styles.input} defaultValue="Chicago" />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Postal code</label>
            <input type="text" style={styles.input} defaultValue="60614" />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>State</label>
            <input type="text" style={styles.input} defaultValue="IL" />
          </div>
        </div>

        {/* Destination Section */}
        <div style={styles.formColumn}>
          <h3 style={styles.formTitle}>Destination</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Company</label>
            <input type="text" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Contact</label>
            <input type="text" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input type="text" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone</label>
            <input type="text" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address line 1</label>
            <input type="text" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address line 2</label>
            <input type="text" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>City</label>
            <input type="text" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Postal code</label>
            <input type="text" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>State</label>
            <select style={styles.input}>
              <option value="">Select state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              {/* Add more states as needed */}
            </select>
          </div>
        </div>
      </div>

      {/* Package Dimensions Section */}
      <div style={styles.dimensionsSection}>
        <div style={styles.dimensionsGrid}>
          <div></div>
          <div style={styles.dimensionsHeader}>Length (inches)</div>
          <div style={styles.dimensionsHeader}>Width (inches)</div>
          <div style={styles.dimensionsHeader}>Height (inches)</div>
          <div style={styles.dimensionsHeader}>Weight (lb)</div>
          <div style={styles.dimensionsHeader}>Piece count</div>

          {/* Box 1 Row */}
          <select style={styles.boxSelector}>
            <option>Box 1</option>
          </select>
          <input type="text" placeholder="Length" style={styles.dimensionsInput} />
          <input type="text" placeholder="Width" style={styles.dimensionsInput} />
          <input type="text" placeholder="Height" style={styles.dimensionsInput} />
          <input type="text" placeholder="Weight (lb)" style={styles.dimensionsInput} />
          <input type="text" defaultValue="1" style={styles.dimensionsInput} />

          {/* Box 2 Row */}
          <select style={styles.boxSelector}>
            <option>Box 2</option>
          </select>
          <input type="text" placeholder="Length" style={styles.dimensionsInput} />
          <input type="text" placeholder="Width" style={styles.dimensionsInput} />
          <input type="text" placeholder="Height" style={styles.dimensionsInput} />
          <input type="text" placeholder="Weight (lb)" style={styles.dimensionsInput} />
          <input type="text" placeholder="Piece count" style={styles.dimensionsInput} />

          {/* Box 3 Row */}
          <select style={styles.boxSelector}>
            <option>Box 3</option>
          </select>
          <input type="text" placeholder="Length" style={styles.dimensionsInput} />
          <input type="text" placeholder="Width" style={styles.dimensionsInput} />
          <input type="text" placeholder="Height" style={styles.dimensionsInput} />
          <input type="text" placeholder="Weight (lb)" style={styles.dimensionsInput} />
          <input type="text" placeholder="Piece count" style={styles.dimensionsInput} />
          
          {/* Box 4 Row */}
          <select style={styles.boxSelector}>
            <option>Box 4</option>
          </select>
          <input type="text" placeholder="Length" style={styles.dimensionsInput} />
          <input type="text" placeholder="Width" style={styles.dimensionsInput} />
          <input type="text" placeholder="Height" style={styles.dimensionsInput} />
          <input type="text" placeholder="Weight (lb)" style={styles.dimensionsInput} />
          <input type="text" placeholder="Piece count" style={styles.dimensionsInput} />
          
          {/* Box 5 Row */}
          <select style={styles.boxSelector}>
            <option>Box 5</option>
          </select>
          <input type="text" placeholder="Length" style={styles.dimensionsInput} />
          <input type="text" placeholder="Width" style={styles.dimensionsInput} />
          <input type="text" placeholder="Height" style={styles.dimensionsInput} />
          <input type="text" placeholder="Weight (lb)" style={styles.dimensionsInput} />
          <input type="text" placeholder="Piece count" style={styles.dimensionsInput} />
          
          {/* Box 6 Row */}
          <select style={styles.boxSelector}>
            <option>Box 6</option>
          </select>
          <input type="text" placeholder="Length" style={styles.dimensionsInput} />
          <input type="text" placeholder="Width" style={styles.dimensionsInput} />
          <input type="text" placeholder="Height" style={styles.dimensionsInput} />
          <input type="text" placeholder="Weight (lb)" style={styles.dimensionsInput} />
          <input type="text" placeholder="Piece count" style={styles.dimensionsInput} />
          
          {/* Box 7 Row */}
          <select style={styles.boxSelector}>
            <option>Box 7</option>
          </select>
          <input type="text" placeholder="Length" style={styles.dimensionsInput} />
          <input type="text" placeholder="Width" style={styles.dimensionsInput} />
          <input type="text" placeholder="Height" style={styles.dimensionsInput} />
          <input type="text" placeholder="Weight (lb)" style={styles.dimensionsInput} />
          <input type="text" placeholder="Piece count" style={styles.dimensionsInput} />
        </div>
        
        {/* Total Weight and Pieces */}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0 30px 0' }}>
          <div style={{ marginLeft: 'auto', paddingRight: '20px' }}>
            <strong>Total weight: 0 lb</strong>
          </div>
          <div>
            <strong>Total pieces: 1</strong>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column */}
          <div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Product<span style={{ color: 'red' }}>*</span>
              </label>
              <select style={{ ...styles.input, width: '100%' }}>
                <option>2nd Day Air</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                Shipment reference<span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" placeholder="Enter value" style={styles.input} />
            </div>
            
            <button style={{ 
              padding: '12px 20px',
              backgroundColor: '#60a5fa',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px'
            }}>
              Continue
            </button>
          </div>
          
          {/* Middle Column */}
          <div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Identification number:</label>
              <div style={{ height: '24px' }}></div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Total charge:</label>
              <div style={{ height: '24px' }}></div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Error message:</label>
              <div style={{ height: '24px' }}></div>
            </div>
            
            <button style={{ 
              padding: '12px 20px',
              backgroundColor: '#ff7043',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px'
            }}>
              Hubspot
            </button>
          </div>
          
          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={{ 
              padding: '12px 20px',
              backgroundColor: '#0084ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '50px'
            }}>
              Download packing slip
            </button>
            
            <button style={{ 
              padding: '12px 20px',
              backgroundColor: '#0084ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              Download Box Content Label
            </button>
            
            <button style={{ 
              padding: '12px 20px',
              backgroundColor: '#f0f0f0',
              color: '#666',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              Check rates
            </button>
          </div>
        </div>
        
        {/* VOID UPS SHIPMENT Section */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            margin: '20px 0', 
            textAlign: 'center' 
          }}>
            VOID UPS SHIPMENT:
          </h3>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Shipment Identification Number</label>
            <input type="text" placeholder="Identification Number" style={styles.input} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Tracking Number</label>
            <input 
              type="text" 
              placeholder="Enter Tracking Number (or leave empty to void all packages in shipment)" 
              style={styles.input} 
            />
          </div>
          
          <button style={{ 
            padding: '12px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '10px'
          }}>
            VOID SHIPMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingToolView;