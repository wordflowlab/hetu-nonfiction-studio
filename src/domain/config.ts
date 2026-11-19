export const config = {
  "fields": {
    "card": "cards",
    "evidence": "evidence",
    "turn": "turns",
    "block": "blocks",
    "claim": "claims",
    "link": "links",
    "assessment": "assessments",
    "note": "notes"
  },
  "defaults": {
    "brief": "",
    "cards": [],
    "evidence": [],
    "turns": [],
    "blocks": [],
    "claims": [],
    "links": [],
    "assessments": [],
    "notes": []
  },
  "tabs": [
    "文章阅读",
    "主张核实",
    "采访原话",
    "证据与出处",
    "纪实交付"
  ]
} as const;
