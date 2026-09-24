import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import AOS from 'aos';

const Onboarding = ({ onNavigate }) => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const flows = [
        {
            id: 'generation',
            title: 'Generation Studio',
            subtitle: 'The Engine Room',
            icon: 'pi-palette',
            color: '#3B82F6',
            desc: 'Drag-and-drop dynamic fields onto your custom templates. Offload PDF creation to our high-speed edge-computing engine for 1,000+ certs in seconds.',
            action: 'Design Certificates',
            path: '/'
        },
        {
            id: 'verification',
            title: 'Trust Portal',
            subtitle: 'Cryptographic Auditing',
            icon: 'pi-shield',
            color: '#10B981',
            desc: 'Ensure 100% authenticity with our proprietary 4-layer security audit. Beyond simple links—we verify QR codes, SHA-256 integrity, steganographic data, and blockchain consensus.',
            action: 'Verify a Credential',
            path: 'verify'
        }
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
            {/* Aurora Background Effects */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>

            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                
                {/* Header */}
                <header style={{ textAlign: 'center', marginBottom: 80 }} data-aos="fade-down">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', padding: '8px 16px', borderRadius: 100, border: '1px solid var(--border)', marginBottom: 24 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}></span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>System v2.0 Ready</span>
                    </div>
                    <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)', margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.25 }}>
                        Welcome to the <br /><span style={{ background: 'linear-gradient(135deg, #3B82F6, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blockchain-Based Certificate Generation and Validation System</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                        The industrial-grade ecosystem for high-speed certificate production and verified validation.
                    </p>
                </header>

                {/* Flow Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 80 }}>
                    {flows.map((flow, idx) => (
                        <div 
                            key={flow.id} 
                            data-aos="fade-up" 
                            data-aos-delay={idx * 150}
                            style={{ 
                                background: 'var(--bg-card)', 
                                border: '1px solid var(--border)', 
                                borderRadius: 32, 
                                padding: 40,
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                boxShadow: 'var(--shadow-card)',
                                cursor: 'default'
                            }}
                        >
                            <div style={{ width: 64, height: 64, borderRadius: 20, background: `${flow.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, border: `1.5px solid ${flow.color}40` }}>
                                <i className={`pi ${flow.icon}`} style={{ fontSize: '1.8rem', color: flow.color }}></i>
                            </div>
                            
                            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 4px' }}>{flow.title}</h2>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: flow.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>{flow.subtitle}</h3>
                            
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 32, flexGrow: 1 }}>
                                {flow.desc}
                            </p>

                            <Button 
                                label={flow.action} 
                                icon={`pi ${flow.icon}`}
                                onClick={() => onNavigate(flow.path)}
                                style={{ 
                                    background: 'var(--bg-primary)', 
                                    border: `1.5px solid ${flow.color}50`, 
                                    borderRadius: 16, 
                                    padding: '14px 24px',
                                    fontWeight: 800,
                                    color: 'var(--text)',
                                    width: '100%'
                                }} 
                            />
                        </div>
                    ))}
                </div>

                {/* Visual Connector / Flow Guide */}
                <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(168,85,247,0.05))', borderRadius: 40, padding: '48px 32px', border: '1px solid var(--border)', textAlign: 'center', marginBottom: 40 }} data-aos="zoom-in">
                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.8rem', marginBottom: 32 }}>The Synchronized Pipeline</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 48 }}>
                        <div style={{ padding: '16px 24px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border)', fontWeight: 800 }}>1. GENERATE (Studio Console)</div>
                        <i className="pi pi-arrow-right" style={{ color: 'var(--text-secondary)' }}></i>
                        <div style={{ padding: '16px 24px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border)', fontWeight: 800 }}>2. VERIFY (Trust Portal)</div>
                    </div>

                    <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.4rem', marginBottom: 24, color: 'var(--text)' }}>Real-Time Blockchain Synchronization Flow</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, textAlign: 'left' }}>
                        {[
                            { step: '1', title: 'Fixed Template Render', desc: 'Certificates are generated from a predefined organizational template using uploaded CSV recipient details.' },
                            { step: '2', title: 'Unique QR Code Embedding', desc: 'A unique QR code is created for every recipient and embedded directly on the certificate PDF.' },
                            { step: '3', title: 'SHA-256 Hashing', desc: 'A cryptographic SHA-256 hash is computed to serve as a tamper-proof digital fingerprint of the document.' },
                            { step: '4', title: 'Steganographic Encryption', desc: 'The certificate hash and validation metadata are hidden invisibly within the PDF binary structures.' },
                            { step: '5', title: 'Transaction Registration', desc: 'A new ledger transaction is created containing only the certificate ID, metadata, and hash.' },
                            { step: '6', title: 'Consortium Broadcast', desc: 'The transaction is broadcasted across all participating authorized institution nodes in the network.' },
                            { step: '7', title: 'Consensus Validation', desc: 'Network nodes validate the certificate transaction using the consortium consensus protocol.' },
                            { step: '8', title: 'Distributed Storage', desc: 'The transaction is permanently and immutably written into the distributed blockchain ledger of all nodes.' },
                            { step: '9', title: 'Instant Verification', desc: 'The certificate becomes immediately verifiable across all connected organizations.' },
                        ].map((s, idx) => (
                            <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 18, padding: 24, position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 12, right: 16, fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', fontFamily: 'Outfit' }}>{s.step}</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8 }}>Phase 0{s.step}</div>
                                <h5 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 8px', color: 'var(--text)' }}>{s.title}</h5>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
