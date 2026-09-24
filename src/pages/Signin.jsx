import React, { useState } from "react";
import { TermsModal, PrivacyModal } from "../components/LegalModals";
import { Checkbox } from "primereact/checkbox";

export default function Signin({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [step, setStep] = useState("auth"); // "auth" or "role"
  const [selectedRole, setSelectedRole] = useState("Teacher");
  const [errorMsg, setErrorMsg] = useState("");

  const roles = [
    { id: 'Student', icon: 'pi-user', label: 'Student / Learner', desc: 'Validating my own skills' },
    { id: 'Teacher', icon: 'pi-book', label: 'Teacher / Educator', desc: 'Certifying my students' },
    { id: 'HR', icon: 'pi-briefcase', label: 'HR / Business', desc: 'Enterprise training & hiring' },
    { id: 'Organizer', icon: 'pi-calendar', label: 'Event Organizer', desc: 'Hackathons & workshops' }
  ];

  const handleAuthSubmit = (e) => {
    e?.preventDefault();
    setErrorMsg("");

    if (!agreed) {
      setErrorMsg("Please agree to the Terms & Privacy Policy to proceed.");
      return;
    }

    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 4) {
      setErrorMsg("Password must be at least 4 characters.");
      return;
    }

    if (isSignUp && !name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (isSignUp && step === "auth") {
      setStep("role");
      return;
    }

    completeLogin(isSignUp ? name : (email.split('@')[0] || "User"), email, selectedRole);
  };

  const handleDemoLogin = () => {
    completeLogin("Demo Admin", "admin@certlock.com", "Teacher");
  };

  const completeLogin = (userName, userEmail, role) => {
    setLoading(true);
    const userData = {
      name: userName || "CertLock User",
      email: userEmail || "user@certlock.com",
      user_type: role || "Teacher",
      sub: "local-" + Date.now()
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("quiz_token", "demo-token-" + Date.now());

    setTimeout(() => {
      setLoading(false);
      if (onLogin) {
        onLogin(userData);
      } else {
        window.location.href = "/";
      }
    }, 600);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#02060c", flexDirection: "column", gap: 24 }}>
        <div style={{ position: "relative", width: 64, height: 64 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "var(--accent, #3B82F6)", animation: "spin 0.8s linear infinite" }} />
          <div style={{ position: "absolute", inset: 12, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="pi pi-shield" style={{ color: "#fff", fontSize: "1.2rem" }} />
          </div>
        </div>
        <h3 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "1.25rem", color: "#fff" }}>Signing you in...</h3>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="signin-page">
      <style>{`
        .signin-page {
          display: flex; align-items: center; justify-content: center; min-height: 100vh;
          background: #02060c; padding: 20px; position: relative; overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }
        .signin-container {
          width: 100%; max-width: ${step === "auth" ? '950px' : '520px'};
          display: flex; flex-direction: row;
          background: #070d19; border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          z-index: 1; transition: all 0.4s ease;
        }
        .signin-content {
          flex: 1.2; padding: 48px 40px; display: flex; flex-direction: column; justify-content: center;
        }
        .signin-illustration-container {
          flex: 1; background: #040812; border-left: 1px solid rgba(255, 255, 255, 0.06);
          display: flex; align-items: center; justify-content: center; padding: 40px; position: relative;
        }
        .signin-illustration {
          width: 100%; height: auto; max-width: 380px; filter: drop-shadow(0 20px 40px rgba(59, 130, 246, 0.2));
        }
        .input-group {
          display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px;
        }
        .input-group label {
          font-size: 0.8rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .input-field {
          width: 100%; padding: 12px 16px; background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
          color: #fff; font-size: 0.95rem; outline: none; transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .input-field:focus {
          border-color: #3B82F6; background: rgba(59, 130, 246, 0.05);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .submit-btn {
          width: 100%; padding: 14px; background: linear-gradient(135deg, #2563EB, #7C3AED);
          border: none; border-radius: 14px; color: #fff; font-weight: 800; font-size: 1rem;
          cursor: pointer; transition: all 0.2s ease; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
        }
        .submit-btn:hover {
          transform: translateY(-2px); box-shadow: 0 14px 30px rgba(37, 99, 235, 0.4);
        }
        .demo-btn {
          width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.04);
          border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 14px; color: #94A3B8;
          font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 12px;
        }
        .demo-btn:hover {
          background: rgba(255, 255, 255, 0.08); color: #fff; border-color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 900px) {
          .signin-container { flex-direction: column; max-width: 480px; }
          .signin-illustration-container { display: none; }
          .signin-content { padding: 36px 24px; }
        }
      `}</style>

      {/* Aurora Blurs */}
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="signin-container">
        {/* Left Column: Form */}
        <div className="signin-content">
          {step === "auth" ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <img src="/logo.png" alt="Logo" style={{ height: 42, width: 'auto' }} />
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>CertLock</span>
              </div>

              <h1 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "1.8rem", color: "#fff", marginBottom: 6, lineHeight: 1.2 }}>
                {isSignUp ? "Create your Account" : "Welcome Back"}
              </h1>
              <p style={{ color: "#94A3B8", fontSize: "0.9rem", marginBottom: 24 }}>
                {isSignUp ? "Sign up with your email to start generating certificates." : "Enter your credentials to access your workspace."}
              </p>

              {errorMsg && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#FCA5A5', padding: '10px 14px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 600, marginBottom: 18 }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleAuthSubmit}>
                {isSignUp && (
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="John Doe"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                )}

                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-field"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{ paddingRight: 40 }}
                    />
                    <i
                      className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', cursor: 'pointer', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0 24px' }}>
                  <Checkbox inputId="agree" checked={agreed} onChange={e => setAgreed(e.checked)} style={{ width: 18, height: 18 }} />
                  <label htmlFor="agree" style={{ fontSize: '0.85rem', color: agreed ? '#CBD5E1' : '#64748B', cursor: 'pointer' }}>
                    I agree to <span onClick={(e) => { e.preventDefault(); setShowTerms(true); }} style={{ color: '#3B82F6', textDecoration: 'underline' }}>Terms</span> & <span onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }} style={{ color: '#3B82F6', textDecoration: 'underline' }}>Privacy Policy</span>
                  </label>
                </div>

                <button type="submit" className="submit-btn">
                  {isSignUp ? "Continue to Role Selection ➔" : "Sign In to Workspace ➔"}
                </button>
              </form>

              <button type="button" className="demo-btn" onClick={handleDemoLogin}>
                <i className="pi pi-bolt" style={{ color: '#F59E0B' }} /> Quick Demo Login (1-Click)
              </button>

              <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <span
                  onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(""); }}
                  style={{ color: '#3B82F6', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {isSignUp ? "Sign In" : "Create Account"}
                </span>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 16, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="pi pi-users" style={{ color: '#3B82F6', fontSize: '1.5rem' }} />
              </div>
              <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.6rem', color: '#fff', marginBottom: 6 }}>Select Your Role</h2>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: 24 }}>Choose how you plan to use CertLock</p>

              <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
                {roles.map(r => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                      background: selectedRole === r.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                      border: selectedRole === r.id ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.05)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`pi ${r.icon}`} style={{ color: '#3B82F6' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>{r.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{r.desc}</div>
                    </div>
                    {selectedRole === r.id && <i className="pi pi-check-circle" style={{ color: '#3B82F6', fontSize: '1.1rem' }} />}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" onClick={() => setStep("auth")} style={{ flex: 1, padding: 12, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                  ← Back
                </button>
                <button type="button" onClick={() => handleAuthSubmit()} className="submit-btn" style={{ flex: 2 }}>
                  Complete Setup ✓
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Illustration (Desktop Only) */}
        <div className="signin-illustration-container">
          <img
            src="/auth_illustration.png"
            alt="Illustration"
            className="signin-illustration"
          />
          <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32, textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Encrypted • Immutable • Instant Verification
            </div>
          </div>
        </div>
      </div>

      <TermsModal visible={showTerms} onHide={() => setShowTerms(false)} />
      <PrivacyModal visible={showPrivacy} onHide={() => setShowPrivacy(false)} />
    </div>
  );
}
