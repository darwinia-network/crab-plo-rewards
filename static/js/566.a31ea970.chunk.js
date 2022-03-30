(self.webpackChunkplo_rewards_export=self.webpackChunkplo_rewards_export||[]).push([[566],{756:(e,t,s)=>{"use strict";s.d(t,{K:()=>f});var r=s(2791),n=s(5485),a=s(1707),o=s(7253),i=s(3456),l=s(4350),c=s(184);const d=[{title:"Index",dataIndex:"index",key:"index",align:"center"},{title:"Address",dataIndex:"address",key:"address",align:"center",render:e=>(0,c.jsx)(n.Z.Text,{copyable:{text:e},children:(0,o.sC)(e)})},{title:"Claim Address",dataIndex:"claimAddress",key:"claimAddress",align:"center",render:e=>e?(0,c.jsxs)("div",{className:"inline-flex space-x-1",children:[(0,c.jsx)(n.Z.Text,{copyable:{text:e.address},type:l.UJ(e.address)?"success":"danger",children:(0,o.sC)(e.address)}),(0,c.jsx)("span",{children:"\xb7"}),(0,c.jsx)(n.Z.Link,{target:"_blank",href:`${e.network===i._.CRAB?"https://kusama.subscan.io/extrinsic/":"https://polkadot.subscan.io/extrinsic/"}${e.extrinsicHash}`,children:"extrinsic"})]}):(0,c.jsx)(n.Z.Text,{children:"None"})},{title:"Is Claimed",dataIndex:"isClaimed",key:"isClaimed",align:"center",render:e=>(0,c.jsx)(n.Z.Text,{type:e?"success":"secondary",children:e?"Yes":"No"}),filters:[{text:"Yes",value:!0},{text:"No",value:!1}],onFilter:(e,t)=>t.isClaimed===e},{title:"Total Conntribute",dataIndex:"totalContribute",key:"totalContribute",align:"center"}],x=e=>(0,c.jsx)(a.Z,{columns:d,dataSource:e.dataSource,loading:e.loading,pagination:{defaultPageSize:50,showQuickJumper:!0,showLessItems:!0,total:e.dataSource.length,showTotal:e=>`Total Items: ${e}`},scroll:{y:"calc(100vh - 20rem)",x:"max-content"}}),f=r.memo(x)},2258:(e,t,s)=>{"use strict";s.d(t,{JH:()=>l,WA:()=>c,Xg:()=>o});s(756);var r=s(2791),n=s(184);const a=e=>(0,n.jsx)("div",{className:`container mx-auto h-screen relative pb-14 ${e.className}`,children:e.children}),o=r.memo(a),i=e=>(0,n.jsx)("div",{className:`pt-6 page-content-height ${e.className}`,children:e.children}),l=r.memo(i),c=()=>(0,n.jsxs)("div",{className:"absolute top-auto bottom-0 h-12 w-full flex justify-center items-center space-x-3",children:[(0,n.jsx)("span",{children:"Copyright\xa92022"}),(0,n.jsx)("span",{children:"|"}),(0,n.jsx)("a",{href:"https://github.com/darwinia-network/plo-rewards-export",target:"_blank",rel:"noopener noreferrer",children:"Github"}),(0,n.jsx)("span",{children:"|"}),(0,n.jsx)("a",{href:"https://crab.network/plo_contribute",target:"_blank",rel:"noopener noreferrer",children:"Crab PLO"}),(0,n.jsx)("span",{children:"|"}),(0,n.jsx)("a",{href:"https://darwinia.network/plo_contribute",target:"_blank",rel:"noopener noreferrer",children:"Darwinia PLO"})]})},9478:(e,t,s)=>{"use strict";s.d(t,{PQ:()=>o,Xq:()=>i,x5:()=>l});var r=s(5395),n=s.n(r),a=s(7743);new(n())("0.00000001"),new(n())("10000000000"),new(n())("1000000000000");const o=a.Ps`
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
`,i=a.Ps`
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
`,l=a.Ps`
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
`},4097:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var r=s(2791),n=s(3504),a=s(2258),o=s(184);const i=e=>(0,o.jsx)(n.rU,{to:e.to,className:"rounded-xl w-80 h-32 flex justify-center items-center transition-transform duration-300 hover:scale-110 text-lg font-black text-blue-400 nav-link",children:(0,o.jsx)("span",{className:"mr-5",children:e.text})}),l=()=>(0,o.jsxs)(a.Xg,{children:[(0,o.jsx)(a.JH,{className:"flex items-center justify-center",children:(0,o.jsxs)("nav",{className:"flex flex-col space-y-7 pb-32",children:[(0,o.jsx)(i,{to:"/crab/nft",text:"Crab NFT"}),(0,o.jsx)(i,{to:"/darwinia/nft",text:"Darwinia NFT"}),(0,o.jsx)(i,{to:"/crab/rewards",text:"Darwinia Rewards"})]})}),(0,o.jsx)(a.WA,{})]}),c=r.memo(l)},3456:(e,t,s)=>{"use strict";let r;s.d(t,{_:()=>r}),function(e){e[e.CRAB=0]="CRAB",e[e.DARWINIA=1]="DARWINIA"}(r||(r={}))},7253:(e,t,s)=>{"use strict";s.d(t,{sC:()=>r,ns:()=>n});s(5395),s(9478),s(3456);const r=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.length&&e.length>12?`${e.slice(0,5)}...${e.slice(e.length-5)}`:e},n=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"transferx.csv",s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"data:text/csv;charset=utf-8";const r=new Blob(["\ufeff"+e],{type:s}),n=URL.createObjectURL(r),a=document.createElement("a");a.style.display="none",a.href=n,a.download=t,document.body.appendChild(a),a.click(),setTimeout((function(){document.body.removeChild(a),window.URL.revokeObjectURL(n)}),0)}},6601:()=>{}}]);
//# sourceMappingURL=566.a31ea970.chunk.js.map