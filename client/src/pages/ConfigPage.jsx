import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { configService } from '../services/configService';
import './ConfigPage.css';

const ConfigPage = () => {
  const { institutionId } = useApp();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [config, setConfig] = useState({
    name: '',
    logo:  '',
    welcomeMessage: '',
    homeText: '',
    supportUrl: '',
    colors: {
      primary: '#0055ff',
      secondary: '#000000'
    }
  });

  useEffect(() => {
    if (institutionId) {
      loadConfig();
    }
  }, [institutionId]);

  const loadConfig = async () => {
    if (!institutionId) {
      setError('Please configure Institution ID in Dashboard');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await configService.get(institutionId);
      if (response.status === 200 && response.data) {
        setConfig(response.data);
      }
    } catch (err) {
      // Si es 404, significa que no existe config aún (está bien)
      if (err.message. includes('404') || err.message.includes('no encontrada')) {
        console.log('No config found, using defaults');
      } else {
        setError(err.message || 'Failed to load configuration');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!institutionId) {
      setError('Institution ID is required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Intentar actualizar primero
      const response = await configService.update(institutionId, config);
      
      if (response.status === 200) {
        setSuccess('Configuration updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      // Si falla, intentar crear
      try {
        const response = await configService.create(institutionId, config);
        if (response. status === 201) {
          setSuccess('Configuration created successfully!');
          setTimeout(() => setSuccess(''), 3000);
        }
      } catch (createErr) {
        setError(createErr.message || 'Failed to save configuration');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name. startsWith('colors.')) {
      const colorKey = name.split('.')[1];
      setConfig(prev => ({
        ...prev,
        colors: {
          ...prev.colors,
          [colorKey]: value
        }
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (! institutionId) {
    return (
      <div className="card">
        <div className="alert alert-warning">
          Please configure Institution ID in the Dashboard first. 
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="config-page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🎨 Institution Configuration</h2>
          <p style={{ margin: '8px 0 0 0', color: '#6c757d', fontSize: '14px' }}>
            Configure the branding and settings for <strong>{institutionId}</strong>
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="config-form">
          <div className="form-section">
            <h3>📝 Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Institution Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={config.name}
                onChange={handleChange}
                placeholder="e.g., Instituto Tec-MX"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo" className="form-label">
                Logo URL *
              </label>
              <input
                type="url"
                id="logo"
                name="logo"
                className="form-control"
                value={config.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                required
              />
              {config.logo && (
                <div className="logo-preview">
                  <img src={config.logo} alt="Logo preview" />
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>💬 Messages</h3>
            
            <div className="form-group">
              <label htmlFor="welcomeMessage" className="form-label">
                Welcome Message *
              </label>
              <input
                type="text"
                id="welcomeMessage"
                name="welcomeMessage"
                className="form-control"
                value={config.welcomeMessage}
                onChange={handleChange}
                placeholder="e.g., Bienvenido al portal académico"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="homeText" className="form-label">
                Home Text *
              </label>
              <textarea
                id="homeText"
                name="homeText"
                className="form-control"
                value={config.homeText}
                onChange={handleChange}
                placeholder="e.g., Consulta tus materias y tareas"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="supportUrl" className="form-label">
                Support URL *
              </label>
              <input
                type="url"
                id="supportUrl"
                name="supportUrl"
                className="form-control"
                value={config.supportUrl}
                onChange={handleChange}
                placeholder="https://support.example.com"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>🎨 Colors</h3>
            
            <div className="colors-grid">
              <div className="form-group">
                <label htmlFor="colors.primary" className="form-label">
                  Primary Color *
                </label>
                <div className="color-input-group">
                  <input
                    type="color"
                    id="colors.primary"
                    name="colors.primary"
                    className="form-control-color"
                    value={config.colors.primary}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={config.colors.primary}
                    onChange={handleChange}
                    name="colors.primary"
                    placeholder="#0055ff"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="colors.secondary" className="form-label">
                  Secondary Color *
                </label>
                <div className="color-input-group">
                  <input
                    type="color"
                    id="colors.secondary"
                    name="colors.secondary"
                    className="form-control-color"
                    value={config.colors. secondary}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={config.colors. secondary}
                    onChange={handleChange}
                    name="colors.secondary"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={saving}
            >
              {saving ? 'Saving...' :  '💾 Save Configuration'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="card config-preview">
        <div className="card-header">
          <h3 className="card-title">👁️ Preview</h3>
        </div>
        <div className="preview-content" style={{
          '--primary-color': config.colors. primary,
          '--secondary-color': config.colors.secondary
        }}>
          {config.logo && (
            <img src={config.logo} alt="Institution Logo" className="preview-logo" />
          )}
          <h2 style={{ color: config.colors.primary }}>{config.name || 'Institution Name'}</h2>
          <p className="preview-welcome">{config.welcomeMessage || 'Welcome Message'}</p>
          <p className="preview-home">{config.homeText || 'Home Text'}</p>
          <a 
            href={config.supportUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: config.colors.primary }}
          >
            🔗 {config.supportUrl || 'Support URL'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;