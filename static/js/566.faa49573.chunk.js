(self.webpackChunkplo_rewards_export=self.webpackChunkplo_rewards_export||[]).push([[566],{756:(e,t,r)=>{"use strict";r.d(t,{K:()=>f});var s=r(2791),n=r(5485),a=r(1707),o=r(7253),i=r(3456),l=r(4350),c=r(184);const d=[{title:"Index",dataIndex:"index",key:"index",align:"center"},{title:"Address",dataIndex:"address",key:"address",align:"center",render:e=>(0,c.jsx)(n.Z.Text,{copyable:{text:e},children:(0,o.QJ)(e)})},{title:"Claim Address",dataIndex:"claimAddress",key:"claimAddress",align:"center",render:e=>e?(0,c.jsxs)("div",{className:"inline-flex space-x-1",children:[(0,c.jsx)(n.Z.Text,{copyable:{text:e.address},type:l.UJ(e.address)?"success":"danger",children:(0,o.QJ)(e.address)}),(0,c.jsx)("span",{children:"\xb7"}),(0,c.jsx)(n.Z.Link,{target:"_blank",href:`${e.network===i._.CRAB?"https://kusama.subscan.io/extrinsic/":"https://polkadot.subscan.io/extrinsic/"}${e.extrinsicHash}`,children:"extrinsic"})]}):(0,c.jsx)(n.Z.Text,{children:"None"})},{title:"Is Claimed",dataIndex:"isClaimed",key:"isClaimed",align:"center",render:e=>(0,c.jsx)(n.Z.Text,{type:e?"success":"secondary",children:e?"Yes":"No"}),filters:[{text:"Yes",value:!0},{text:"No",value:!1}],onFilter:(e,t)=>t.isClaimed===e},{title:"Total Conntribute",dataIndex:"totalContribute",key:"totalContribute",align:"center"}],x=e=>(0,c.jsx)(a.Z,{columns:d,dataSource:e.dataSource,loading:e.loading,pagination:{defaultPageSize:50,showQuickJumper:!0,showLessItems:!0,total:e.dataSource.length,showTotal:e=>`Total Items: ${e}`},scroll:{y:"calc(100vh - 20rem)",x:"max-content"}}),f=s.memo(x)},2258:(e,t,r)=>{"use strict";r.d(t,{JH:()=>l,WA:()=>c,Xg:()=>o});r(756);var s=r(2791),n=r(184);const a=e=>(0,n.jsx)("div",{className:`container mx-auto h-screen relative pb-14 ${e.className}`,children:e.children}),o=s.memo(a),i=e=>(0,n.jsx)("div",{className:`pt-6 page-content-height ${e.className}`,children:e.children}),l=s.memo(i),c=()=>(0,n.jsxs)("div",{className:"absolute top-auto bottom-0 h-12 w-full flex justify-center items-center space-x-3",children:[(0,n.jsx)("span",{children:"Copyright\xa92022"}),(0,n.jsx)("span",{children:"|"}),(0,n.jsx)("a",{href:"https://github.com/darwinia-network/plo-rewards-export",target:"_blank",rel:"noopener noreferrer",children:"Github"}),(0,n.jsx)("span",{children:"|"}),(0,n.jsx)("a",{href:"https://crab.network/plo_contribute",target:"_blank",rel:"noopener noreferrer",children:"Crab PLO"}),(0,n.jsx)("span",{children:"|"}),(0,n.jsx)("a",{href:"https://darwinia.network/plo_contribute",target:"_blank",rel:"noopener noreferrer",children:"Darwinia PLO"})]})},9478:(e,t,r)=>{"use strict";r.d(t,{j9:()=>o,bN:()=>i,rM:()=>l,fD:()=>c,PQ:()=>d,Xq:()=>x,x5:()=>f});var s=r(5395),n=r.n(s),a=r(7743);const o=2e8,i=8e3,l=(new(n())("0.00000001"),new(n())("10000000000"),new(n())("1000000000000"),new(n())("10000000000")),c=42,d=a.Ps`
  query GetContributorsPower($first: Int!, $offset: Int!) {
    crowdloanWhoStatistics(orderBy: TOTAL_BALANCE_DESC, first: $first, offset: $offset) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        user
        totalPower
        totalBalance
      }
    }
  }
`,x=a.Ps`
  query GetReferralsPower($first: Int!, $offset: Int!) {
    crowdloanReferStatistics(first: $first, offset: $offset) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        user
        totalPower
        totalBalance
      }
    }
  }
`,f=a.Ps`
  query GetUserNftClaimed($first: Int!, $offset: Int!) {
    remarkedNftAddresses(orderBy: [EXTRINSIC_TIMESTAMP_ASC], first: $first, offset: $offset) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        signer
        addressValue
        extrinsicHash
      }
    }
  }
`},4097:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var s=r(2791),n=r(3504),a=r(2258),o=r(184);const i=e=>(0,o.jsx)(n.rU,{to:e.to,className:"rounded-xl w-80 h-32 flex justify-center items-center transition-transform duration-300 hover:scale-110 text-lg font-black text-blue-400 nav-link",children:(0,o.jsx)("span",{className:"mr-5",children:e.text})}),l=()=>(0,o.jsxs)(a.Xg,{children:[(0,o.jsx)(a.JH,{className:"flex items-center justify-center",children:(0,o.jsxs)("nav",{className:"flex flex-col space-y-7 pb-32",children:[(0,o.jsx)(i,{to:"/crab/nft",text:"Crab NFT"}),(0,o.jsx)(i,{to:"/darwinia/nft",text:"Darwinia NFT"}),(0,o.jsx)(i,{to:"/crab/rewards",text:"Crab Rewards"}),(0,o.jsx)(i,{to:"/crab/airdrop",text:"Crab Airdrop"})]})}),(0,o.jsx)(a.WA,{})]}),c=s.memo(l)},3456:(e,t,r)=>{"use strict";let s;r.d(t,{_:()=>s}),function(e){e[e.CRAB=0]="CRAB",e[e.DARWINIA=1]="DARWINIA"}(s||(s={}))},7253:(e,t,r)=>{"use strict";r.d(t,{QJ:()=>c,j1:()=>x,it:()=>f,ns:()=>u});var s=r(7730),n=r(692),a=r(9453),o=r(8787),i=r(822),l=r(4273);r(5395),r(9478),r(3456);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.length&&e.length>12?`${e.slice(0,5)}...${e.slice(e.length-5)}`:e},d=new l.P;function x(e){if(!e)return d.createType("AccountId","");const t=new Uint8Array(32);t.set((0,n.d)("dvm:")),t.set((0,a.G)(e),11);const r=t.reduce(((e,t)=>e^t));t.set((0,o.V)(r),31);return d.createType("AccountId",t)}function f(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e||(0,i.F)(t))return"";try{let n=(0,s.m)(e,t);return r&&(n=c(n)),n}catch(n){return""}}const u=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"transferx.csv",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"data:text/csv;charset=utf-8";const s=new Blob(["\ufeff"+e],{type:r}),n=URL.createObjectURL(s),a=document.createElement("a");a.style.display="none",a.href=n,a.download=t,document.body.appendChild(a),a.click(),setTimeout((function(){document.body.removeChild(a),window.URL.revokeObjectURL(n)}),0)}},6601:()=>{}}]);
//# sourceMappingURL=566.faa49573.chunk.js.map