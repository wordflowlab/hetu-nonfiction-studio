import {requireValue as need} from '../../vendor/project-store.ts';
import {digest,find,ordered,unique,checkNotes} from './shared.ts';
import {span} from './text.ts';
export const blockDigest=(b:any)=>digest(b);
export function claimContext(p:any,id:string){const claim=find(p.claims,id,'主张'),block=find(p.blocks,claim.block_id,'段落'),links=p.links.filter((x:any)=>x.claim_id===id);const evidence=links.map((x:any)=>find(p.evidence,x.evidence_id,'证据'));return {claim,block,links,evidence,cards:p.cards.filter((c:any)=>evidence.some((e:any)=>e.source_index===c.source_index))};}
export const claimDigest=(p:any,id:string)=>digest(claimContext(p,id));
export function target(p:any,kind:string,id:string){if(kind==='claim')return claimContext(p,id);return find(kind==='block'?p.blocks:p.turns,id,'意见目标');}
export const targetDigest=(p:any,kind:string,id:string)=>digest(target(p,kind,id));
export function claimReport(p:any,id:string){const context=claimContext(p,id),current=claimDigest(p,id),assessments=p.assessments.filter((x:any)=>x.claim_id===id);return {...context,context_sha256:current,stale_anchor:context.claim.block_sha256!==blockDigest(context.block),assessments:assessments.map((x:any)=>({...x,stale:x.context_sha256!==current})),support_count:context.links.filter((x:any)=>x.relation==='supports').length,contradiction_count:context.links.filter((x:any)=>x.relation==='contradicts').length};}
export function validateNonfiction(p:any){
 unique(p.blocks.map((x:any)=>x.order),'文章段落顺序重复。');unique(p.turns.map((x:any)=>x.order),'采访原话顺序重复。');unique(p.cards.map((x:any)=>x.source_index),'同一来源重复说明，请维护原来源卡。');
 for(const e of p.evidence){need(e.byte_end>e.byte_start,'证据区间不能为空。');need(p.cards.some((c:any)=>c.source_index===e.source_index),'证据缺少来源说明。');}
 for(const t of p.turns){need(t.speaker.trim(),'原话须明确说话人。');find(p.evidence,t.evidence_id,'采访证据');}
 for(const c of p.claims){const b=find(p.blocks,c.block_id,'主张段落');if(c.block_sha256===blockDigest(b))need(span(b.text,c.byte_start,c.byte_end)===c.excerpt,'主张锚点与固定段落不一致。');}
 unique(p.links.map((x:any)=>JSON.stringify([x.claim_id,x.evidence_id,x.relation])),'同一主张与证据关系重复。');
 for(const l of p.links){find(p.claims,l.claim_id,'主张');find(p.evidence,l.evidence_id,'证据');}
 for(const a of p.assessments){const r=claimReport(p,a.claim_id);if(a.context_sha256===r.context_sha256){need(!r.stale_anchor,'段落依据已变化，先复核主张锚点。');if(a.judgment==='supported')need(r.support_count>0&&r.contradiction_count===0,'有支持记录须有支持且无尚存反证。');if(a.judgment==='contested')need(r.contradiction_count>0,'争议记录须有明确反证。');}}
 checkNotes(p,(kind,id)=>target(p,kind,id));
}
export function checkNonfiction(p:any){const claims:any[]=p.claims.map((c:any)=>claimReport(p,c.id));return {claims,unsupported_claim_ids:claims.filter(c=>!c.support_count).map(c=>c.claim.id),contested_claim_ids:claims.filter(c=>c.contradiction_count).map(c=>c.claim.id),stale_claim_ids:claims.filter(c=>c.stale_anchor).map(c=>c.claim.id),unassessed_claim_ids:claims.filter(c=>!c.assessments.some((x:any)=>!x.stale)).map(c=>c.claim.id),stale_assessment_ids:claims.flatMap(c=>c.assessments.filter((a:any)=>a.stale).map((a:any)=>a.id)),stale_note_ids:p.notes.filter((n:any)=>n.target_sha256!==targetDigest(p,n.target_kind,n.target_id)).map((n:any)=>n.id),note:'核实记录是明确判断及其依据，不是软件或Agent的事实认证。'};}
export function citations(p:any){const used=new Set(p.links.map((x:any)=>x.evidence_id));return p.evidence.filter((e:any)=>used.has(e.id)).map((e:any)=>({evidence_id:e.id,quote:e.quote,source:find(p.cards,p.cards.find((c:any)=>c.source_index===e.source_index)?.id,'来源说明')}));}
export function articleText(p:any){return '# '+p.title+'\n\n'+ordered(p.blocks).map(b=>'## '+b.title+'\n\n'+b.text).join('\n\n')+'\n';}
