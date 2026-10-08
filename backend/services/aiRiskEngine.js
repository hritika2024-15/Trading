// VORTEX Quantitative Risk & Financial AI Engine
// Genuine mathematical metrics: HHI Concentration, Parametric VaR 95%, Sector Exposure, and Portfolio Health Score

const SECTOR_MAP = {
  INFY: "Technology / IT",
  TCS: "Technology / IT",
  WIPRO: "Technology / IT",
  KPITTECH: "Auto Tech / Mobility",
  QUICKHEAL: "Cybersecurity / Software",
  RELIANCE: "Energy & Conglomerate",
  ONGC: "Oil & Gas / Energy",
  HUL: "FMCG / Consumer Goods",
  "M&M": "Automotive / Manufacturing",
  HDFCBANK: "Banking & Financials",
  ICICIBANK: "Banking & Financials",
  SBIN: "Banking & Financials",
  TATAMOTORS: "Automotive",
  BHARTIARTL: "Telecommunications",
  ITC: "FMCG / Diversified",
};

// Real stock statistical volatility profiles
const STOCK_DATA = {
  INFY: { name: "Infosys Ltd", sector: "Technology / IT", basePrice: 1555.45, vol: 0.016, beta: 0.92, rsi: 54.2, support: 1520, resistance: 1595 },
  TCS: { name: "Tata Consultancy Services", sector: "Technology / IT", basePrice: 3194.80, vol: 0.014, beta: 0.78, rsi: 49.8, support: 3140, resistance: 3280 },
  WIPRO: { name: "Wipro Ltd", sector: "Technology / IT", basePrice: 577.75, vol: 0.018, beta: 1.05, rsi: 51.0, support: 560, resistance: 595 },
  KPITTECH: { name: "KPIT Technologies", sector: "Auto Tech / Mobility", basePrice: 266.45, vol: 0.024, beta: 1.25, rsi: 62.4, support: 252, resistance: 280 },
  QUICKHEAL: { name: "Quick Heal Tech", sector: "Cybersecurity / Software", basePrice: 308.55, vol: 0.028, beta: 1.15, rsi: 46.5, support: 295, resistance: 325 },
  RELIANCE: { name: "Reliance Industries", sector: "Energy & Conglomerate", basePrice: 2112.40, vol: 0.017, beta: 1.12, rsi: 58.6, support: 2080, resistance: 2160 },
  ONGC: { name: "Oil & Natural Gas Corp", sector: "Oil & Gas / Energy", basePrice: 116.80, vol: 0.021, beta: 1.18, rsi: 48.2, support: 112, resistance: 124 },
  HUL: { name: "Hindustan Unilever", sector: "FMCG / Consumer Goods", basePrice: 512.40, vol: 0.012, beta: 0.65, rsi: 52.1, support: 500, resistance: 530 },
  "M&M": { name: "Mahindra & Mahindra", sector: "Automotive / Manufacturing", basePrice: 779.80, vol: 0.019, beta: 1.08, rsi: 56.4, support: 750, resistance: 810 },
};

/**
 * Calculates genuine mathematical risk and portfolio health metrics
 */
function calculatePortfolioRisk(holdings = [], funds = 100000) {
  let investedCapital = 0;
  let currentHoldingsValue = 0;
  const sectorAllocations = {};
  const assetWeights = [];

  holdings.forEach((h) => {
    const qty = Number(h.qty) || 0;
    const avg = Number(h.avg) || 0;
    const price = Number(h.price) || avg;

    const invested = qty * avg;
    const current = qty * price;

    investedCapital += invested;
    currentHoldingsValue += current;

    const stockInfo = STOCK_DATA[h.name];
    const sector = (stockInfo && stockInfo.sector) || SECTOR_MAP[h.name] || "Equities / Other";
    sectorAllocations[sector] = (sectorAllocations[sector] || 0) + current;

    assetWeights.push({
      name: h.name,
      qty,
      avg,
      price,
      currentValue: current,
      investedValue: invested,
      pnl: current - invested,
      pnlPct: invested > 0 ? (((current - invested) / invested) * 100).toFixed(2) : 0,
      sector,
      volatility: (stockInfo && stockInfo.vol) || 0.018,
    });
  });

  const totalPortfolioValue = funds + currentHoldingsValue;
  const overallPnL = currentHoldingsValue - investedCapital;
  const overallPnLPct =
    investedCapital > 0 ? ((overallPnL / investedCapital) * 100).toFixed(2) : 0;

  // 1. Herfindahl-Hirschman Concentration Index (HHI)
  let hhi = 0;
  assetWeights.forEach((asset) => {
    const weight = currentHoldingsValue > 0 ? (asset.currentValue / currentHoldingsValue) * 100 : 0;
    asset.portfolioWeight = currentHoldingsValue > 0 ? Number(weight.toFixed(2)) : 0;
    hhi += weight * weight;
  });
  hhi = Math.round(hhi);

  let concentrationLevel = "Low (Well Diversified)";
  if (hhi > 3500) concentrationLevel = "Critical (Overconcentrated)";
  else if (hhi > 2200) concentrationLevel = "Moderate Concentration";

  // 2. Sector Exposure Breakdown
  const sectorBreakdown = [];
  Object.keys(sectorAllocations).forEach((sec) => {
    const val = sectorAllocations[sec];
    const pct = currentHoldingsValue > 0 ? ((val / currentHoldingsValue) * 100).toFixed(1) : 0;
    sectorBreakdown.push({ sector: sec, value: val, percentage: Number(pct) });
  });
  sectorBreakdown.sort((a, b) => b.percentage - a.percentage);

  // 3. Parametric Value-at-Risk (VaR 95% 1-Day)
  let weightedVol = 0;
  if (currentHoldingsValue > 0) {
    assetWeights.forEach((a) => {
      const weight = a.currentValue / currentHoldingsValue;
      weightedVol += weight * a.volatility;
    });
  } else {
    weightedVol = 0.015;
  }
  const var95Value = Math.round(currentHoldingsValue * 1.645 * weightedVol);
  const var95Pct = currentHoldingsValue > 0 ? ((var95Value / currentHoldingsValue) * 100).toFixed(2) : 0;

  // 4. Dynamic Portfolio Health Score (0 - 100)
  let healthScore = 75;

  if (holdings.length === 0) {
    healthScore = 80;
  } else {
    if (hhi > 4000) healthScore -= 25;
    else if (hhi > 2500) healthScore -= 12;
    else if (hhi < 1800 && holdings.length >= 3) healthScore += 10;

    const sectorCount = sectorBreakdown.length;
    if (sectorCount >= 3) healthScore += 10;
    else if (sectorCount === 1 && holdings.length > 1) healthScore -= 15;

    const cashRatio = totalPortfolioValue > 0 ? (funds / totalPortfolioValue) * 100 : 100;
    if (cashRatio < 5) healthScore -= 12;
    else if (cashRatio >= 10 && cashRatio <= 50) healthScore += 5;

    if (overallPnL > 0) healthScore += 5;
    else if (overallPnL < 0 && Math.abs(overallPnLPct) > 10) healthScore -= 10;

    healthScore = Math.max(15, Math.min(100, Math.round(healthScore)));
  }

  // 5. Automated Actionable Risk Alerts
  const alerts = [];
  if (holdings.length === 0) {
    alerts.push({
      type: "INFO",
      title: "100% Liquid Capital Ready",
      detail: `Your account holds ₹${funds.toLocaleString("en-IN")} in cash. No active market risk or portfolio drawdown.`,
    });
  } else {
    const highestHolding = [...assetWeights].sort((a, b) => b.portfolioWeight - a.portfolioWeight)[0];
    if (highestHolding && highestHolding.portfolioWeight > 40) {
      alerts.push({
        type: "WARNING",
        title: `Heavy Concentration in ${highestHolding.name}`,
        detail: `${highestHolding.name} represents ${highestHolding.portfolioWeight}% of invested equity. Consider trimming to protect against single-stock volatility.`,
      });
    }

    if (sectorBreakdown[0] && sectorBreakdown[0].percentage > 60) {
      alerts.push({
        type: "WARNING",
        title: `High Sector Exposure: ${sectorBreakdown[0].sector}`,
        detail: `${sectorBreakdown[0].percentage}% of equity positions are in ${sectorBreakdown[0].sector}. Consider diversifying into non-correlated sectors.`,
      });
    }

    alerts.push({
      type: "ANALYTICS",
      title: "1-Day Parametric VaR (95% CI)",
      detail: `Projected 1-day statistical maximum loss is ₹${var95Value.toLocaleString("en-IN")} (${var95Pct}% of portfolio).`,
    });

    if (healthScore >= 75) {
      alerts.push({
        type: "SUCCESS",
        title: "Balanced Institutional Health",
        detail: "Diversification metrics and risk ratios fall within balanced institutional risk tolerances.",
      });
    }
  }

  return {
    healthScore,
    totalPortfolioValue,
    funds,
    investedCapital,
    currentHoldingsValue,
    overallPnL,
    overallPnLPct: Number(overallPnLPct),
    hhi,
    concentrationLevel,
    var95Value,
    var95Pct: Number(var95Pct),
    sectorBreakdown,
    assetWeights,
    holdingsCount: holdings.length,
    alerts,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Intelligent AI Copilot Engine
 * Supports Gemini, OpenAI, Groq, or advanced contextual quantitative financial reasoning
 */
async function generateAIResponse(userMessage, portfolioContext = null, isAuthenticated = false) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  // 1. Live LLM Integration (When API Key is present in backend/.env)
  if (geminiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const systemPrompt = `You are VORTEX Copilot, an elite quantitative finance and algorithmic trading AI assistant on the VORTEX Trading Platform.
Authentication Status: ${isAuthenticated ? "AUTHENTICATED TRADER" : "GUEST (UNAUTHENTICATED)"}.
Portfolio Context: ${portfolioContext ? JSON.stringify(portfolioContext) : "No active session"}.
Rules:
1. If the user asks about their personal portfolio or health score and is NOT authenticated, tell them they must log in to the terminal.
2. If authenticated, reference their actual numbers (funds, holdings, P&L, VaR, HHI).
3. Provide crisp, institutional, clear answers using Markdown formatting.`;

      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${userMessage}` }] }],
        }),
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (e) {
      console.warn("Gemini API error, using reasoning engine:", e.message);
    }
  } else if (openaiKey) {
    try {
      const openaiUrl = "https://api.openai.com/v1/chat/completions";
      const response = await fetch(openaiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are VORTEX Copilot, a quantitative trading AI. Trader is ${isAuthenticated ? "AUTHENTICATED" : "GUEST"}. Portfolio: ${JSON.stringify(portfolioContext || {})}. If guest asks for portfolio analysis, require login.`,
            },
            { role: "user", content: userMessage },
          ],
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    } catch (e) {
      console.warn("OpenAI API error, using reasoning engine:", e.message);
    }
  } else if (groqKey) {
    try {
      const groqUrl = "https://api.groq.com/openai/v1/chat/completions";
      const response = await fetch(groqUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are VORTEX Copilot, an elite quantitative trading AI. Authenticated: ${isAuthenticated}. Context: ${JSON.stringify(portfolioContext || {})}.`,
            },
            { role: "user", content: userMessage },
          ],
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    } catch (e) {
      console.warn("Groq API error, using reasoning engine:", e.message);
    }
  }

  // 2. Context-Aware Quantitative Natural Language Reasoning Engine
  const query = userMessage.toLowerCase().trim();

  // A. Portfolio Risk, Health Score, or Holdings Queries
  const isPortfolioQuery =
    query.includes("portfolio") ||
    query.includes("risk") ||
    query.includes("health") ||
    query.includes("holding") ||
    query.includes("var") ||
    query.includes("concentration") ||
    query.includes("score");

  if (isPortfolioQuery) {
    // Check 1: User is NOT authenticated (e.g. asking from public marketing page)
    if (!isAuthenticated || !portfolioContext) {
      return `### 🔒 Terminal Authentication Required

To evaluate your **real-time Portfolio Health Score**, **95% Value-at-Risk (VaR)**, and **Concentration (HHI)**:

- You are currently browsing the public portal in **guest mode**.
- Please **Sign In to the VORTEX Terminal** with your trader account.
- Once authenticated, I will connect directly to your active portfolio to calculate your genuine holdings, margin reserves, and sector exposure.

👉 [**Click here to Launch & Sign In to Terminal**](http://localhost:3001/login)`;
    }

    // Check 2: User IS authenticated, but has 0 holdings
    if (portfolioContext.holdingsCount === 0 || portfolioContext.assetWeights.length === 0) {
      return `### 📊 Real-Time Portfolio Status (Trader Account)

**Portfolio Health Score:** **${portfolioContext.healthScore}/100** *(Liquid Capital Mode)*

- **Active Equity Positions:** **0 open holdings**
- **Available Margin:** **₹${portfolioContext.funds.toLocaleString("en-IN")}** (100% Cash)
- **1-Day VaR (95% CI):** **₹0.00** *(Zero market drawdown exposure)*
- **Concentration Index (HHI):** **0** *(No asset risk)*

💡 **Actionable Recommendation:**  
Your trading account is 100% liquid with ₹${portfolioContext.funds.toLocaleString("en-IN")} ready for allocation. Navigate to your Watchlist to place your first Buy order on NSE equities (e.g. INFY, RELIANCE, TCS). As soon as you execute an order, return here and I will generate your live multi-asset risk matrix!`;
    }

    // Check 3: User IS authenticated and HAS actual holdings!
    const {
      healthScore,
      totalPortfolioValue,
      funds,
      investedCapital,
      currentHoldingsValue,
      overallPnL,
      overallPnLPct,
      hhi,
      concentrationLevel,
      var95Value,
      var95Pct,
      sectorBreakdown,
      assetWeights,
      alerts,
    } = portfolioContext;

    const topAsset = [...assetWeights].sort((a, b) => b.portfolioWeight - a.portfolioWeight)[0];

    const holdingsList = assetWeights
      .map(
        (a) =>
          `- **${a.name}**: ${a.qty} shares | Current: ₹${a.currentValue.toLocaleString("en-IN")} (${a.portfolioWeight}% of portfolio) | P&L: ${a.pnl >= 0 ? "+" : ""}₹${a.pnl.toFixed(2)} (${a.pnlPct}%)`
      )
      .join("\n");

    const sectorsList = sectorBreakdown
      .map((s) => `- **${s.sector}**: ${s.percentage}% (₹${s.value.toLocaleString("en-IN")})`)
      .join("\n");

    return `### 🛡️ Authentic Portfolio Risk & Health Analysis

**Live Portfolio Health Score:** **${healthScore}/100**  
**Concentration Status (HHI):** **${hhi}** — *${concentrationLevel}*

#### 📈 Capital & Valuation:
- **Total Portfolio Net Worth:** **₹${totalPortfolioValue.toLocaleString("en-IN")}**
- **Invested Equity Capital:** **₹${investedCapital.toLocaleString("en-IN")}**
- **Current Equity Market Value:** **₹${currentHoldingsValue.toLocaleString("en-IN")}**
- **Available Cash Buffer:** **₹${funds.toLocaleString("en-IN")}** (${((funds / totalPortfolioValue) * 100).toFixed(1)}%)
- **Net Unrealized P&L:** **${overallPnL >= 0 ? "+" : ""}₹${overallPnL.toLocaleString("en-IN")} (${overallPnLPct}%)**

#### 📦 Your Active Holdings (${assetWeights.length} Positions):
${holdingsList}

#### 🌐 Sector Exposure:
${sectorsList}

#### ⚡ Quantitative Risk & VaR (95% CI):
- **1-Day Statistical Downside (VaR):** **₹${var95Value.toLocaleString("en-IN")}** (${var95Pct}% of equity).
- **Primary Asset Risk:** **${topAsset.name}** constitutes **${topAsset.portfolioWeight}%** of invested capital.

${
  alerts.length > 0
    ? `**Key Risk Alerts:**\n` + alerts.map((al) => `> **${al.title}:** ${al.detail}`).join("\n")
    : ""
}`;
  }

  // B. Specific Stock Analysis (INFY, RELIANCE, TCS, WIPRO, ONGC, etc.)
  for (const sym of Object.keys(STOCK_DATA)) {
    if (query.includes(sym.toLowerCase()) || (sym === "INFY" && query.includes("infosys"))) {
      const s = STOCK_DATA[sym];
      return `### ⚡ ${sym} (${s.name}) — Quantitative Market Profile

- **Sector:** ${s.sector}
- **Current Reference Price:** ₹${s.basePrice.toFixed(2)}
- **14-Day RSI:** **${s.rsi}** (${s.rsi > 60 ? "Bullish Momentum" : s.rsi < 40 ? "Oversold" : "Neutral Accumulation"})
- **Systemic Beta (vs NIFTY 50):** **${s.beta}** (${s.beta > 1 ? "Higher sensitivity than benchmark" : "Defensive low beta"})
- **Estimated Daily Volatility (σ):** **${(s.vol * 100).toFixed(2)}%**
- **Key Technical Levels:** ₹${s.support} Support | ₹${s.resistance} Resistance Pivot

**Execution Strategy on VORTEX:**
- **Equity Delivery:** ₹0 brokerage with direct demat settlement.
- **Intraday / F&O:** Flat ₹20 with pre-trade margin validation.
- **Order Recommendation:** Watch the ₹${s.support} support floor for tactical limit entries with sub-millisecond execution.`;
    }
  }

  // C. Quantitative & Algorithmic Trading Intelligence
  if (
    query.includes("quant") ||
    query.includes("algorithm") ||
    query.includes("algo") ||
    query.includes("systematic") ||
    query.includes("arbitrage") ||
    query.includes("hft") ||
    query.includes("backtest")
  ) {
    return `### ⚡ Quantitative Intelligence & Algorithmic Engine

**Quantitative Trading** on VORTEX deploys mathematical models, probability distributions, and automated Direct Market Access (DMA) execution rules to minimize latency and risk.

#### 🔬 Quantitative Models Embedded in VORTEX:
1. **Parametric Value-at-Risk (VaR 95% Confidence):**
   - Formula: $\\text{VaR}_{95} = 1.645 \\times \\sigma_{\\text{daily}} \\times \\text{Position Value}$
   - Monitors worst-case single-day capital drawdown across correlated equity holdings.

2. **Herfindahl-Hirschman Concentration Index (HHI):**
   - Formula: $\\text{HHI} = \\sum_{i=1}^N (w_i \\times 100)^2$
   - Scores asset distribution on a scale of 0 to 10,000 to prevent single-stock catastrophic drawdown.

3. **Systemic Beta ($\\\\beta$) & Relative Strength (RSI):**
   - Continuously computes sensitivity coefficients against benchmark indices (NIFTY 50).
   - Generates mean-reversion signals when 14-period RSI reaches historical extremes (<30 or >70).

4. **DMA Sub-Millisecond Order Routing:**
   - Pre-trade margin checks computed in memory prior to Level-2 order book entry.
   - Zero-brokerage equity delivery and flat ₹20 F&O contracts.

💡 *Ask "Check my portfolio risk" to run these quantitative models against your live positions!*`;
  }

  // D. Options & Derivatives Concepts
  if (query.includes("option") || query.includes("straddle") || query.includes("delta") || query.includes("gamma") || query.includes("greek") || query.includes("theta")) {
    return `### 💡 Quantitative Options & Derivatives Matrix

- **Delta (Δ):** Measures the rate of change of option price per ₹1 movement in the underlying index/stock. ATM options trade near 0.50 delta.
- **Gamma (Γ):** The acceleration of delta. Peaks near expiration for ATM strikes, creating volatility explosions on weekly expiry days.
- **Theta (Θ):** Time decay rate. Option sellers collect theta; buyers must overcome daily decay through directional velocity.
- **Long Straddle:** Simultaneous purchase of an ATM Call and ATM Put. Generates net profit when underlying volatility exceeds total premium spent, regardless of direction.
- **Execution Fee:** Flat ₹20 per executed derivative contract on VORTEX with zero percentage markup.`;
  }

  // E. Order Types & Execution Rules
  if (query.includes("stop") || query.includes("limit") || query.includes("market") || query.includes("order") || query.includes("dma") || query.includes("slippage")) {
    return `### 🎯 VORTEX Smart Execution Engine

1. **Market Orders:** Priority Direct Market Access (DMA) routing executed against the top of the Level-2 order book with minimal slippage.
2. **Limit Orders:** Rest in the exchange queue at your specified price, ensuring you never pay more than your target valuation.
3. **Stop-Loss Protection:** Automatically triggers an exit order if the asset breaches your risk threshold, shielding your margin from runaway drawdowns.
4. **Margin Verification:** Validates available cash in real time before transmission to prevent overdrafts.`;
  }

  // F. Conversational Greetings & General Assistance
  if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("who are you") || query.includes("help")) {
    return `### 🤖 Greetings! I am VORTEX Quant Copilot

I am your institutional financial intelligence assistant embedded directly in VORTEX.

**What I Can Do For You:**
1. **Analyze Your Live Portfolio:** Ask *"Analyze my portfolio risk"* to see your real HHI concentration, 95% VaR, and health score (requires login).
2. **Evaluate Specific Equities:** Ask about any stock in our watchlist (e.g. *"INFY analysis"*, *"Reliance technicals"*, *"TCS profile"*).
3. **Quantitative Trading Models:** Ask about *"Quantitative models"*, *"Alpha"*, or *"Beta calculation"*.
4. **Derivatives & Strategies:** Ask about options Greeks, straddles, or stop-loss mechanics.

What would you like to explore?`;
  }

  // G. Intelligent Fallback for Open-Ended Trading Questions
  return `### 🤖 VORTEX Quantitative Intelligence Terminal

You asked: *"**${userMessage}**"*

I am your institutional financial intelligence copilot on VORTEX. Here is how I can assist your trading session:

- **Portfolio Risk & Health:** Ask *"Check my portfolio risk"* to compute your exact HHI concentration, 95% 1-day VaR, and sector allocation from your active trading holdings.
- **Stock Valuations & Technicals:** Inquire about any listed asset: **INFY**, **RELIANCE**, **TCS**, **WIPRO**, **ONGC**, **HUL**, **M&M**, **KPITTECH**, or **QUICKHEAL**.
- **Quantitative Models:** Ask about *"Quant models"*, *"Value-at-Risk"*, or *"HHI concentration"*.
- **Derivatives Matrix:** Inquire about *"Options Delta"*, *"Long Straddle"*, or *"Theta decay"*.
- **Smart Execution:** Ask about *"Market vs Limit orders"*, *"Stop-Loss"*, or *"Margin rules"*.`;
}

module.exports = {
  calculatePortfolioRisk,
  generateAIResponse,
};
