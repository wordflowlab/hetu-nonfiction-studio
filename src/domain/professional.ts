import {requireValue as need} from '../../vendor/project-store.ts';
import {fixedHistory,find,ordered} from './shared.ts';
import {artifact} from './artifact.ts';
import {validateNonfiction,checkNonfiction,claimReport,claimDigest,blockDigest,targetDigest,citations,articleText} from './nonfiction.ts';
export const validateDomain=validateNonfiction;
export function validateTransition(next:any,prev:any,..._rest:any[]){fixedHistory(next,prev,['evidence','turns','assessments']);for(const a of next.assessments)if(!prev?.assessments.some((x:any)=>x.id===a.id))need(a.context_sha256===claimDigest(next,a.claim_id),'核实记录必须固定当前主张与证据组合。','hetu.stale_evidence');}
export async function checkSources(_p:any,_s:any[],..._rest:any[]){}
export async function pureAction(_a:string,_i:any){return undefined;}
export async function writeProfessional(_a:string,_p:any,_s:any[],_i:any,..._rest:any[]){throw Error('未知专业写动作。');}
export function summaries(p:any){return [{title:'创作目标',lines:[p.brief]},{title:'完整文章',lines:[articleText(p)]},{title:'主张与核实',lines:p.claims.map((c:any)=>{const r=claimReport(p,c.id);return c.statement+'；支持'+r.support_count+'；反证'+r.contradiction_count+'；'+(r.stale_anchor?'段落依据已变化':'固定段落')+'；'+r.assessments.map((a:any)=>a.judgment+' '+a.reason+(a.stale?'（旧依据）':'')).join('；');})},{title:'采访原话',lines:ordered(p.turns).map(t=>t.speaker+'：“'+find(p.evidence,t.evidence_id).quote+'” '+t.context)},{title:'证据与出处',lines:p.evidence.map((e:any)=>e.label+'：“'+e.quote+'” 来源：'+p.cards.find((c:any)=>c.source_index===e.source_index)?.title)},{title:'固定意见',lines:p.notes.map((n:any)=>n.comment+'；'+n.status+' '+n.resolution)}];}
export async function readProfessional(a:string,p:any,_s:any[],i:any,..._rest:any[]){
 if(a==='check_nonfiction')return checkNonfiction(p);if(a==='claim_report')return {claims:p.claims.map((c:any)=>claimReport(p,c.id))};
 if(a==='claim_digest')return {claim:find(p.claims,i.claim_id),context_sha256:claimDigest(p,i.claim_id)};
 if(a==='target_digest')return {target_sha256:targetDigest(p,i.target_kind,i.target_id)};
 if(a==='evidence_report')return {evidence:p.evidence.map((e:any)=>({...e,card:p.cards.find((c:any)=>c.source_index===e.source_index),relations:p.links.filter((l:any)=>l.evidence_id===e.id)}))};
 if(a==='interview_view')return {turns:ordered(p.turns).map(t=>({...t,evidence:find(p.evidence,t.evidence_id)}))};
 if(a==='article_view')return {blocks:ordered(p.blocks)};if(a==='citation_list')return {citations:citations(p),format:'明确字段与原引文，未执行CSL或参考文献标准认证'};
 if(a==='export_article')return {...artifact(articleText(p),'纪实文章.txt','text/plain',i),losses:['文章文件不包含完整采访原件、核实记录与专业ID；完整工程另行导出。']};
 if(a==='export_review'){const {reportHTML}=await import('./report.ts');return artifact(reportHTML({project:p}),'纪实核实本.html','text/html',i);}
}
