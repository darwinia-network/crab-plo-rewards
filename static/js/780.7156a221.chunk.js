(()=>{var e={7139:(e,t,r)=>{"use strict";var o=r(3865),a=r(2766),s=r(8514),d=r(9453),n=r(4289),i=r(5395),l=r.n(i),f=r(7743);const u=2e8,c=.075,p=(new(l())("0.00000001"),new(l())("10000000000"),new(l())("1000000000000"));f.Ps`
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
`,f.Ps`
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
`,f.Ps`
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
`;let x;!function(e){e[e.CRAB=0]="CRAB",e[e.DARWINIA=1]="DARWINIA"}(x||(x={}));const m=(e,t)=>{let r=l()(0),i=l()(0),f=l()(0),x=l()(0);const m=[],h=[];return t.forEach((e=>{r=r.add(e.totalPower)})),e.forEach((e=>{r=r.add(e.totalPower),i=i.add(e.totalBalance)})),e.forEach((e=>{const a=t.find((t=>{return t.user===(r=e.user,(0,s.c)((0,o.m)(r)));var r})),d=l()(e.totalPower).add(a?a.totalPower:0).div(r),n=d.times(u),i=d.times(8e3),w=n.times(c),g=i.times(c);f=f.add(w),x=x.add(g),m.push([e.user,"ring",w.toFixed(8),"kusama"]),m.push([e.user,"kton",g.toFixed(8),"kusama"]),h.push({key:h.length,index:h.length+1,address:e.user,ksmAsContributor:l()(e.totalBalance).div(p).toFixed(8),ksmAsReferral:l()(a?a.totalBalance:0).div(p).toFixed(8),crabRewards:n.toFixed(8),cktonRewards:i.toFixed(8),stageCRabRewards:w.toFixed(8),stageCKtonRewards:g.toFixed(8)})})),t.forEach((e=>{const t=(e=>{try{const t=(0,a.m)((0,d.G)(e)),r=new n.Y;return r.setSS58Format(2),r.addFromAddress(t).address}catch(t){return console.error(t),e}})(e.user);if(!h.find((e=>e.address===t))){const o=l()(e.totalPower).div(r),a=o.times(u),s=o.times(8e3),d=a.times(c),n=s.times(c);f=f.add(d),x=x.add(n),m.push([t,"ring",d.toFixed(8),"kusama"]),m.push([t,"kton",n.toFixed(8),"kusama"]),h.push({key:h.length,index:h.length+1,address:t,ksmAsContributor:l()(0).toFixed(8),ksmAsReferral:l()(e.totalBalance).div(p).toFixed(8),crabRewards:a.toFixed(8),cktonRewards:s.toFixed(8),stageCRabRewards:d.toFixed(8),stageCKtonRewards:n.toFixed(8)})}})),{totalPower:r.toString(),totalBalance:i.div(p).toFixed(8),totalStageCRab:f.toFixed(0),totalStageCKton:x.toFixed(0),csvRows:m,rewardsTableDataSource:h}};onmessage=e=>{const t=m(e.data[0],e.data[1]);postMessage(t)}},5856:()=>{},573:()=>{},5024:()=>{}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var s=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(s.exports,s,s.exports,r),s.loaded=!0,s.exports}r.m=e,r.x=()=>{var e=r.O(void 0,[743,404,289],(()=>r(7139)));return e=r.O(e)},(()=>{var e=[];r.O=(t,o,a,s)=>{if(!o){var d=1/0;for(f=0;f<e.length;f++){for(var[o,a,s]=e[f],n=!0,i=0;i<o.length;i++)(!1&s||d>=s)&&Object.keys(r.O).every((e=>r.O[e](o[i])))?o.splice(i--,1):(n=!1,s<d&&(d=s));if(n){e.splice(f--,1);var l=a();void 0!==l&&(t=l)}}return t}s=s||0;for(var f=e.length;f>0&&e[f-1][2]>s;f--)e[f]=e[f-1];e[f]=[o,a,s]}})(),r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[])),r.u=e=>"static/js/"+e+"."+{289:"0b971c4b",404:"71d3c38f",743:"b87e6081"}[e]+".chunk.js",r.miniCssF=e=>{},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),r.p="/plo-rewards-export/",(()=>{var e={780:1};r.f.i=(t,o)=>{e[t]||importScripts(r.p+r.u(t))};var t=self.webpackChunkplo_rewards_export=self.webpackChunkplo_rewards_export||[],o=t.push.bind(t);t.push=t=>{var[a,s,d]=t;for(var n in s)r.o(s,n)&&(r.m[n]=s[n]);for(d&&d(r);a.length;)e[a.pop()]=1;o(t)}})(),(()=>{var e=r.x;r.x=()=>Promise.all([743,404,289].map(r.e,r)).then(e)})();r.x()})();
//# sourceMappingURL=780.7156a221.chunk.js.map