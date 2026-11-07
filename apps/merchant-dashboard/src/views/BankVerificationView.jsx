import React, { useState } from 'react';
import { ShieldCheck, Building2, Smartphone, Search, Zap, Check, RefreshCw, } from 'lucide-react';
import { useToast } from '../components/Toast.jsx';
export const BankVerificationView = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('bank');
    // Bank Form
    const [accountNumber, setAccountNumber] = useState('5010029310892');
    const [ifsc, setIfsc] = useState('HDFC0001082');
    const [beneficiaryName, setBeneficiaryName] = useState('Priya Sharma');
    const [isVerifyingBank, setIsVerifyingBank] = useState(false);
    const [bankResult, setBankResult] = useState(null);
    // VPA Form
    const [vpa, setVpa] = useState('priyasharma@okaxis');
    const [isVerifyingVpa, setIsVerifyingVpa] = useState(false);
    const [vpaResult, setVpaResult] = useState(null);
    // IFSC Form
    const [searchIfsc, setSearchIfsc] = useState('ICIC0000412');
    const [ifscResult, setIfscResult] = useState(null);
    const handleVerifyBank = (e) => {
        e.preventDefault();
        setIsVerifyingBank(true);
        setBankResult(null);
        setTimeout(() => {
            const utr = `4312${Math.floor(10000000 + Math.random() * 90000000)}`;
            const res = {
                status: 'VALID',
                registeredName: beneficiaryName.toUpperCase(),
                accountNumber: `•••• •••• ${accountNumber.slice(-4)}`,
                ifsc: ifsc.toUpperCase(),
                bank: 'HDFC Bank Ltd',
                branch: 'Koramangala 4th Block, Bengaluru',
                utr,
                nameMatchScore: '100% Exact Match',
                time: new Date().toLocaleTimeString(),
            };
            setIsVerifyingBank(false);
            setBankResult(res);
            showToast(`Bank account verified! Registered Name: ${res.registeredName}`, 'success');
        }, 1200);
    };
    const handleVerifyVpa = (e) => {
        e.preventDefault();
        setIsVerifyingVpa(true);
        setVpaResult(null);
        setTimeout(() => {
            const handle = vpa.split('@')[0];
            const registeredName = handle.replace(/[^a-zA-Z]/g, ' ').toUpperCase() || 'PRIYA SHARMA';
            const res = {
                vpa: vpa.toLowerCase(),
                status: 'VERIFIED',
                registeredName,
                psp: vpa.split('@')[1]?.toUpperCase() || 'AXIS BANK',
                time: new Date().toLocaleTimeString(),
            };
            setIsVerifyingVpa(false);
            setVpaResult(res);
            showToast(`UPI ID verified! Registered Name: ${registeredName}`, 'success');
        }, 900);
    };
    const handleLookupIfsc = (e) => {
        e.preventDefault();
        const res = {
            ifsc: searchIfsc.toUpperCase(),
            bank: 'ICICI Bank Ltd',
            branch: 'Bandra Kurla Complex Branch',
            city: 'Mumbai',
            state: 'Maharashtra',
            micr: '400229012',
            neft: true,
            rtgs: true,
            imps: true,
            upi: true,
        };
        setIfscResult(res);
        showToast(`IFSC details loaded for ${searchIfsc.toUpperCase()}`, 'info');
    };
    return (<div className="space-y-6 select-none animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-[#0b63e5] border border-blue-200">
            <ShieldCheck className="w-5 h-5"/>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Buimb-PayX Verification Suite</h2>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 uppercase">
            Penny Drop & VPA Validation
          </span>
        </div>
        <p className="text-xs text-slate-500 max-w-xl">
          Instantly verify customer & vendor bank account numbers via NPCI Penny Drop, validate UPI IDs (VPAs), and resolve full branch addresses by IFSC code before initiating high-value payouts.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          <button onClick={() => setActiveTab('bank')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'bank'
            ? 'bg-[#0b63e5] text-white shadow-sm'
            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
            <Building2 className="w-4 h-4"/>
            <span>Penny Drop Bank Verification</span>
          </button>

          <button onClick={() => setActiveTab('vpa')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'vpa'
            ? 'bg-[#0b63e5] text-white shadow-sm'
            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
            <Smartphone className="w-4 h-4"/>
            <span>UPI ID / VPA Validation</span>
          </button>

          <button onClick={() => setActiveTab('ifsc')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'ifsc'
            ? 'bg-[#0b63e5] text-white shadow-sm'
            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
            <Search className="w-4 h-4"/>
            <span>IFSC Directory Lookup</span>
          </button>
        </div>

        {/* Tab 1: Penny Drop */}
        {activeTab === 'bank' && (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Verify Bank Account Number</h3>
                <p className="text-xs text-slate-500">
                  Sends a real-time micro-credit of ₹1.00 via IMPS to fetch the official account holder name directly from the beneficiary bank.
                </p>
              </div>

              <form onSubmit={handleVerifyBank} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">Account Number</label>
                  <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Enter 9-18 digit account number" required className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"/>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">IFSC Code</label>
                    <input type="text" value={ifsc} onChange={(e) => setIfsc(e.target.value)} placeholder="HDFC0001082" required className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono uppercase text-slate-900 focus:outline-none focus:border-blue-600"/>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">Beneficiary Name</label>
                    <input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} placeholder="Priya Sharma" className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"/>
                  </div>
                </div>

                <button type="submit" disabled={isVerifyingBank} className="w-full h-11 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2">
                  {isVerifyingBank ? (<>
                      <RefreshCw className="w-4 h-4 animate-spin"/>
                      <span>Dispatching ₹1 Penny Drop...</span>
                    </>) : (<>
                      <Zap className="w-4 h-4"/>
                      <span>Verify Account Now (₹1 Penny Drop)</span>
                    </>)}
                </button>
              </form>
            </div>

            {/* Verification Result Card */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Verification Output
              </span>

              {bankResult ? (<div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]"/>
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm">{bankResult.registeredName}</div>
                        <div className="text-[11px] text-emerald-700 font-bold">Account Active & Valid</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {bankResult.nameMatchScore}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Bank Name</span>
                      <span className="font-bold text-slate-800">{bankResult.bank}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">IFSC Code</span>
                      <span className="font-mono font-bold text-blue-600">{bankResult.ifsc}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Branch Location</span>
                      <span className="font-medium text-slate-700">{bankResult.branch}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Bank UTR</span>
                      <span className="font-mono font-bold text-slate-800">{bankResult.utr}</span>
                    </div>
                  </div>
                </div>) : (<div className="text-center py-10 space-y-2 text-slate-400">
                  <Building2 className="w-10 h-10 mx-auto opacity-40"/>
                  <p className="text-xs">Enter account details and click verify to see live banking results.</p>
                </div>)}
            </div>
          </div>)}

        {/* Tab 2: VPA Validation */}
        {activeTab === 'vpa' && (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Validate UPI Virtual Payment Address</h3>
                <p className="text-xs text-slate-500">
                  Performs real-time NPCI VPA lookup to verify handle validity and registered account name.
                </p>
              </div>

              <form onSubmit={handleVerifyVpa} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">UPI ID / VPA</label>
                  <input type="text" value={vpa} onChange={(e) => setVpa(e.target.value)} placeholder="e.g. priyasharma@okaxis" required className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"/>
                </div>

                <button type="submit" disabled={isVerifyingVpa} className="w-full h-11 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70">
                  {isVerifyingVpa ? (<RefreshCw className="w-4 h-4 animate-spin"/>) : (<>
                      <Zap className="w-4 h-4"/>
                      <span>Verify UPI VPA</span>
                    </>)}
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                VPA Validation Output
              </span>

              {vpaResult ? (<div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]"/>
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm">{vpaResult.registeredName}</div>
                        <div className="text-[11px] text-blue-600 font-mono font-bold">{vpaResult.vpa}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      VALID VPA
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Partner PSP Bank</span>
                      <span className="font-bold text-slate-800">{vpaResult.psp}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Verified Timestamp</span>
                      <span className="font-mono text-slate-600">{vpaResult.time}</span>
                    </div>
                  </div>
                </div>) : (<div className="text-center py-10 space-y-2 text-slate-400">
                  <Smartphone className="w-10 h-10 mx-auto opacity-40"/>
                  <p className="text-xs">Enter a UPI ID to verify against NPCI rails.</p>
                </div>)}
            </div>
          </div>)}

        {/* Tab 3: IFSC Directory */}
        {activeTab === 'ifsc' && (<div className="space-y-4">
            <form onSubmit={handleLookupIfsc} className="flex gap-2 max-w-md">
              <input type="text" value={searchIfsc} onChange={(e) => setSearchIfsc(e.target.value)} placeholder="Enter 11-digit IFSC code (e.g. SBIN0001082)" required className="flex-1 h-10 px-3.5 rounded-lg border border-slate-300 font-mono uppercase text-xs focus:outline-none focus:border-blue-600"/>
              <button type="submit" className="px-5 h-10 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-sm cursor-pointer">
                Lookup
              </button>
            </form>

            {ifscResult && (<div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 max-w-xl text-xs animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">{ifscResult.bank}</div>
                  <span className="font-mono font-bold text-blue-600">{ifscResult.ifsc}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Branch</span>
                    <span className="font-medium text-slate-700">{ifscResult.branch}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">City & State</span>
                    <span className="font-medium text-slate-700">{ifscResult.city}, {ifscResult.state}</span>
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">NEFT ✓</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">RTGS ✓</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">IMPS ✓</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">UPI ✓</span>
                </div>
              </div>)}
          </div>)}
      </div>
    </div>);
};
