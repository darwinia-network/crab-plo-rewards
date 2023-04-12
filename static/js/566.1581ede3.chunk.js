(self.webpackChunkplo_rewards_export=self.webpackChunkplo_rewards_export||[]).push([[566],{756:(e,t,r)=>{"use strict";r.d(t,{K:()=>u});var n=r(2791),s=r(5485),a=r(1707),i=r(7253),c=r(3456),l=r(4350),o=r(184);const d=[{title:"Index",dataIndex:"index",key:"index",align:"center"},{title:"Address",dataIndex:"address",key:"address",align:"center",render:e=>(0,o.jsx)(s.Z.Text,{copyable:{text:e},children:(0,i.QJ)(e)})},{title:"Claim Address",dataIndex:"claimAddress",key:"claimAddress",align:"center",render:e=>e?(0,o.jsxs)("div",{className:"inline-flex space-x-1",children:[(0,o.jsx)(s.Z.Text,{copyable:{text:e.address},type:l.UJ(e.address)?"success":"danger",children:(0,i.QJ)(e.address)}),(0,o.jsx)("span",{children:"\xb7"}),(0,o.jsx)(s.Z.Link,{target:"_blank",href:`${e.network===c._.CRAB?"https://kusama.subscan.io/extrinsic/":"https://polkadot.subscan.io/extrinsic/"}${e.extrinsicHash}`,children:"extrinsic"})]}):(0,o.jsx)(s.Z.Text,{children:"None"})},{title:"Is Claimed",dataIndex:"isClaimed",key:"isClaimed",align:"center",render:e=>(0,o.jsx)(s.Z.Text,{type:e?"success":"secondary",children:e?"Yes":"No"}),filters:[{text:"Yes",value:!0},{text:"No",value:!1}],onFilter:(e,t)=>t.isClaimed===e},{title:"Total Conntribute",dataIndex:"totalContribute",key:"totalContribute",align:"center"}],x=e=>(0,o.jsx)(a.Z,{columns:d,dataSource:e.dataSource,loading:e.loading,pagination:{defaultPageSize:50,showQuickJumper:!0,showLessItems:!0,total:e.dataSource.length,showTotal:e=>`Total Items: ${e}`},scroll:{y:"calc(100vh - 20rem)",x:"max-content"}}),u=n.memo(x)},2258:(e,t,r)=>{"use strict";r.d(t,{JH:()=>l,WA:()=>o,Xg:()=>i});r(756);var n=r(2791),s=r(184);const a=e=>(0,s.jsx)("div",{className:`container mx-auto h-screen relative pb-14 ${e.className}`,children:e.children}),i=n.memo(a),c=e=>(0,s.jsx)("div",{className:`pt-6 page-content-height ${e.className}`,children:e.children}),l=n.memo(c),o=()=>(0,s.jsxs)("div",{className:"absolute top-auto bottom-0 h-12 w-full flex justify-center items-center space-x-3",children:[(0,s.jsx)("span",{children:"Copyright\xa92022"}),(0,s.jsx)("span",{children:"|"}),(0,s.jsx)("a",{href:"https://github.com/darwinia-network/plo-rewards-export",target:"_blank",rel:"noopener noreferrer",children:"Github"}),(0,s.jsx)("span",{children:"|"}),(0,s.jsx)("a",{href:"https://crab.network/plo_contribute",target:"_blank",rel:"noopener noreferrer",children:"Crab PLO"}),(0,s.jsx)("span",{children:"|"}),(0,s.jsx)("a",{href:"https://darwinia.network/plo_contribute",target:"_blank",rel:"noopener noreferrer",children:"Darwinia PLO"})]})},9478:(e,t,r)=>{"use strict";r.d(t,{j9:()=>i,bN:()=>c,rM:()=>l,fD:()=>o,OV:()=>d,PK:()=>x});var n=r(5395),s=r.n(n),a=r(7743);const i=2e8,c=8e3,l=(new(s())("0.00000001"),new(s())("10000000000"),new(s())("1000000000000"),new(s())("1000000000")),o=42,d=a.Ps`
  query GetUserClaimRemarks($first: Int!, $after: String!) {
    claimRemarksConnection(orderBy: [blockNumber_ASC], first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          signer
          addressValue
          extrinsicHash
        }
      }
    }
  }
`,x=a.Ps`
  query GetUserClaimRemarks($first: Int!) {
    claimRemarksConnection(orderBy: [blockNumber_ASC], first: $first) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          signer
          addressValue
          extrinsicHash
        }
      }
    }
  }
`},4097:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var n=r(2791),s=r(3504),a=r(2258),i=r(184);const c=e=>(0,i.jsx)(s.rU,{to:e.to,className:"rounded-xl w-80 h-32 flex justify-center items-center transition-transform duration-300 hover:scale-110 text-lg font-black text-blue-400 nav-link",children:(0,i.jsx)("span",{className:"mr-5",children:e.text})}),l=()=>(0,i.jsxs)(a.Xg,{children:[(0,i.jsx)(a.JH,{className:"flex items-center justify-center",children:(0,i.jsxs)("nav",{className:"flex flex-col space-y-7 pb-32",children:[(0,i.jsx)(c,{to:"/crab/nft",text:"Crab NFT"}),(0,i.jsx)(c,{to:"/darwinia/nft",text:"Darwinia NFT"}),(0,i.jsx)(c,{to:"/crab/rewards",text:"Crab Rewards"}),(0,i.jsx)(c,{to:"/crab/airdrop",text:"Crab Airdrop"})]})}),(0,i.jsx)(a.WA,{})]}),o=n.memo(l)},3456:(e,t,r)=>{"use strict";let n;r.d(t,{_:()=>n}),function(e){e[e.CRAB=0]="CRAB",e[e.DARWINIA=1]="DARWINIA"}(n||(n={}))},7253:(e,t,r)=>{"use strict";r.d(t,{QJ:()=>o,j1:()=>x,it:()=>u,ns:()=>h});var n=r(7730),s=r(692),a=r(9453),i=r(8787),c=r(822),l=r(4273);r(5395),r(9478),r(3456);const o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.length&&e.length>12?`${e.slice(0,5)}...${e.slice(e.length-5)}`:e},d=new l.P;function x(e){if(!e)return d.createType("AccountId","");const t=new Uint8Array(32);t.set((0,s.d)("dvm:")),t.set((0,a.G)(e),11);const r=t.reduce(((e,t)=>e^t));t.set((0,i.V)(r),31);return d.createType("AccountId",t)}function u(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e||(0,c.F)(t))return"";try{let s=(0,n.m)(e,t);return r&&(s=o(s)),s}catch(s){return""}}const h=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"transferx.csv",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"data:text/csv;charset=utf-8";const n=new Blob(["\ufeff"+e],{type:r}),s=URL.createObjectURL(n),a=document.createElement("a");a.style.display="none",a.href=s,a.download=t,document.body.appendChild(a),a.click(),setTimeout((function(){document.body.removeChild(a),window.URL.revokeObjectURL(s)}),0)}},6601:()=>{}}]);
//# sourceMappingURL=566.1581ede3.chunk.js.map