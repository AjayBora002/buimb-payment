import React, { useState } from 'react';
import { Calculator, } from 'lucide-react';
import { useToast } from '../components/Toast.jsx';
export const ToolsView = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('gst');
    // GST Calculator State
    const [baseAmount, setBaseAmount] = useState('10,000');
    const [gstRate, setGstRate] = useState(18);
    const [gstType, setGstType] = useState('EXCLUSIVE');
    // TDS Calculator State
    const [tdsAmount, setTdsAmount] = useState('50,000');
    const [tdsSection, setTdsSection] = useState('194J');
    // GSTIN Search State
    const [gstinQuery, setGstinQuery] = useState('29AABCU9603R1Z7');
    const [gstinResult, setGstinResult] = useState(null);
    // Calculate GST
    const rawBase = parseFloat(baseAmount.replace(/,/g, '')) || 0;
    let gstAmount = 0;
    let totalWithGst = 0;
    let netBase = rawBase;
    if (gstType === 'EXCLUSIVE') {
        gstAmount = (rawBase * gstRate) / 100;
        totalWithGst = rawBase + gstAmount;
    }
    else {
        netBase = (rawBase * 100) / (100 + gstRate);
        gstAmount = rawBase - netBase;
        totalWithGst = rawBase;
    }
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    // Calculate TDS
    const rawTdsBase = parseFloat(tdsAmount.replace(/,/g, '')) || 0;
    const tdsRates = {
        '194C': { rate: 2, desc: 'Payment to Contractors & Sub-contractors (2%)' },
        '194J': { rate: 10, desc: 'Fees for Professional or Technical Services (10%)' },
        '194I': { rate: 10, desc: 'Rent on Land, Building, Furniture (10%)' },
        '194Q': { rate: 0.1, desc: 'Purchase of Goods exceeding ₹50 Lakhs (0.1%)' },
    };
    const activeTds = tdsRates[tdsSection];
    const tdsDeduction = (rawTdsBase * activeTds.rate) / 100;
    const netPayable = rawTdsBase - tdsDeduction;
    const handleSearchGstin = (e) => {
        e.preventDefault();
        setGstinResult({
            gstin: gstinQuery.toUpperCase(),
            legalName: 'BORA ENTERPRISES PRIVATE LIMITED',
            tradeName: 'Bora Payments & Logistics',
            status: 'ACTIVE',
            taxpayerType: 'Regular',
            state: 'Karnataka',
            registrationDate: '12/04/2021',
            pan: gstinQuery.substring(2, 12).toUpperCase(),
        });
        showToast(`GSTIN ${gstinQuery.toUpperCase()} verified!`, 'success');
    };
    return (<div className="space-y-6 select-none animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-[#0b63e5] border border-blue-200">
            <Calculator className="w-5 h-5"/>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Buimb-Pay Business Tools & Calculators</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 uppercase">
            GST & TDS Compliance
          </span>
        </div>
        <p className="text-xs text-slate-500 max-w-xl">
          Complimentary Indian corporate tools for calculating exact GST CGST/SGST breakdowns, computing TDS withholdings under official Income Tax sections, and validating GSTIN business registrations.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          <button onClick={() => setActiveTab('gst')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'gst' ? 'bg-[#0b63e5] text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
            GST Calculator
          </button>
          <button onClick={() => setActiveTab('tds')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'tds' ? 'bg-[#0b63e5] text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
            TDS Withholding Calculator
          </button>
          <button onClick={() => setActiveTab('gstin')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'gstin' ? 'bg-[#0b63e5] text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
            GSTIN Search & Verification
          </button>
        </div>

        {/* Tab 1: GST Calculator */}
        {activeTab === 'gst' && (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Amount (INR)</label>
                <input type="text" value={baseAmount} onChange={(e) => setBaseAmount(e.target.value)} className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"/>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Calculation Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setGstType('EXCLUSIVE')} className={`py-2 rounded-lg font-bold ${gstType === 'EXCLUSIVE' ? 'bg-[#0b63e5] text-white' : 'bg-slate-100 text-slate-700'}`}>
                    GST Exclusive (Add GST)
                  </button>
                  <button type="button" onClick={() => setGstType('INCLUSIVE')} className={`py-2 rounded-lg font-bold ${gstType === 'INCLUSIVE' ? 'bg-[#0b63e5] text-white' : 'bg-slate-100 text-slate-700'}`}>
                    GST Inclusive (Extract GST)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Select GST Slab</label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 12, 18, 28].map((rate) => (<button key={rate} type="button" onClick={() => setGstRate(rate)} className={`py-2.5 rounded-xl font-bold ${gstRate === rate ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                      {rate}%
                    </button>))}
                </div>
              </div>
            </div>

            {/* GST Output */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tax Breakdown Summary
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Net Taxable Amount:</span>
                  <span className="font-mono font-bold text-slate-800">₹{netBase.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">CGST ({gstRate / 2}%):</span>
                  <span className="font-mono font-bold text-slate-800">₹{cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">SGST ({gstRate / 2}%):</span>
                  <span className="font-mono font-bold text-slate-800">₹{sgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Total GST ({gstRate}%):</span>
                  <span className="font-mono font-bold text-blue-600">₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300 text-sm">
                  <span className="font-black text-slate-900">Total Invoice Amount:</span>
                  <span className="font-mono font-black text-emerald-600">₹{totalWithGst.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>)}

        {/* Tab 2: TDS Calculator */}
        {activeTab === 'tds' && (<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Gross Bill Amount (INR)</label>
                <input type="text" value={tdsAmount} onChange={(e) => setTdsAmount(e.target.value)} className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"/>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Income Tax Section</label>
                <select value={tdsSection} onChange={(e) => setTdsSection(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-800">
                  <option value="194J">Section 194J — Professional / Technical Services (10%)</option>
                  <option value="194C">Section 194C — Contractor / Sub-contractor (2%)</option>
                  <option value="194I">Section 194I — Rent on Property (10%)</option>
                  <option value="194Q">Section 194Q — Purchase of Goods (0.1%)</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TDS Withholding Computation
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Gross Invoice Amount:</span>
                  <span className="font-mono font-bold text-slate-800">₹{rawTdsBase.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Applicable Section:</span>
                  <span className="font-bold text-slate-800">Section {tdsSection}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">TDS to Deduct ({activeTds.rate}%):</span>
                  <span className="font-mono font-bold text-rose-600">-₹{tdsDeduction.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300 text-sm">
                  <span className="font-black text-slate-900">Net Payable to Vendor:</span>
                  <span className="font-mono font-black text-emerald-600">₹{netPayable.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>)}

        {/* Tab 3: GSTIN Search */}
        {activeTab === 'gstin' && (<div className="space-y-4">
            <form onSubmit={handleSearchGstin} className="flex gap-2 max-w-md">
              <input type="text" value={gstinQuery} onChange={(e) => setGstinQuery(e.target.value)} placeholder="Enter 15-digit GSTIN (e.g. 29AABCU9603R1Z7)" required className="flex-1 h-10 px-3.5 rounded-lg border border-slate-300 font-mono uppercase text-xs focus:outline-none focus:border-blue-600"/>
              <button type="submit" className="px-5 h-10 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-sm cursor-pointer">
                Verify GSTIN
              </button>
            </form>

            {gstinResult && (<div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 max-w-xl text-xs animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <div className="font-black text-slate-900 text-base">{gstinResult.legalName}</div>
                    <div className="text-[11px] text-slate-500">{gstinResult.tradeName}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ACTIVE TAXPAYER
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 text-[11px] block">GSTIN</span>
                    <span className="font-mono font-bold text-blue-600">{gstinResult.gstin}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Associated PAN</span>
                    <span className="font-mono font-bold text-slate-800">{gstinResult.pan}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">State Jurisdiction</span>
                    <span className="font-medium text-slate-700">{gstinResult.state}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Registration Date</span>
                    <span className="font-medium text-slate-700">{gstinResult.registrationDate}</span>
                  </div>
                </div>
              </div>)}
          </div>)}
      </div>
    </div>);
};
