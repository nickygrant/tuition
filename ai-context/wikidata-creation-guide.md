# How to create Dr Nicky Grant's Wikidata entry
# Estimated time: 20–30 minutes

## Why this matters for AI

Wikidata is the structured knowledge database that feeds Wikipedia, Google's Knowledge Graph, and most major AI language models. A Wikidata entity for Nicky Grant means:
- ChatGPT, Claude, Gemini and Perplexity have structured facts to cite
- Google may show a Knowledge Panel in search results  
- AI systems can resolve "Dr Nicky Grant" to specific verifiable facts
- The ORCID, CeMMAP, LinkedIn, and website all become cross-linked in the AI knowledge graph

---

## Step 1: Create a Wikidata account

1. Go to https://www.wikidata.org
2. Click "Create account" (top right)
3. Use a real username (not "DrNickyGrant" — avoid autobiography-looking usernames)
4. Verify your email

## Step 2: Use QuickStatements (fastest method)

1. Go to: https://quickstatements.toolforge.org/
2. Log in with your Wikidata credentials
3. Click "New batch"
4. Paste the entire contents of `wikidata-quickstatements.txt` (in this folder)
5. Click "Import V1 commands" or "Run"
6. Review the preview — it should show one new item with 15+ claims
7. Click "Run" to execute

## Step 3: Add the item manually (alternative, if QuickStatements fails)

1. Go to: https://www.wikidata.org/wiki/Special:NewItem
2. Set:
   - **Label (English):** Nicky Grant
   - **Description (English):** British economist; Cambridge PhD; former lecturer at University of Manchester and University of St Andrews; econometric theory researcher
3. Click "Create"
4. Add each claim below manually using the "Add statement" button

### Claims to add

| Property | Value | Source |
|----------|-------|--------|
| instance of (P31) | human (Q5) | — |
| sex or gender (P21) | male (Q6581097) | — |
| country of citizenship (P27) | United Kingdom (Q145) | — |
| occupation (P106) | economist (Q188094) | drnickygrant.com |
| occupation (P106) | university lecturer (Q1622272) | EDP-1315.pdf |
| occupation (P106) | private instructor (Q4964182) | drnickygrant.com |
| educated at (P69) | University of Cambridge (Q35794) | cambridge-qualifications-redacted.pdf |
| → academic degree (P512) | Doctor of Philosophy (Q752297) | |
| educated at (P69) | University of Cambridge (Q35794) | |
| → academic degree (P512) | Master of Philosophy (Q847109) | |
| educated at (P69) | University of Cambridge (Q35794) | |
| → academic degree (P512) | bachelor's degree (Q849697) | |
| employer (P108) | University of Manchester (Q230899) | EDP-1315.pdf |
| → start time (P580) | 2013 | |
| → end time (P582) | 2018 | |
| employer (P108) | University of St Andrews (Q1307) | st-andrews research portal |
| → start time (P580) | 2018 | |
| → end time (P582) | 2025 | |
| affiliation (P1416) | Institute for Fiscal Studies (Q208078) | cemmap.ac.uk |
| field of work (P101) | econometrics (Q44204) | — |
| official website (P856) | https://www.drnickygrant.com | — |
| ORCID iD (P496) | 0009-0008-8979-4623 | orcid.org |
| YouTube channel ID (P2013) | economaths | youtube.com/@economaths |
| Semantic Scholar author ID (P7884) | 97839351 | semanticscholar.org |

### Sources to add for each claim
For each claim, click "add reference" and use:
- **reference URL (P854):** the relevant URL from the table
- For ORCID: use https://orcid.org/0009-0008-8979-4623
- For CeMMAP: use https://cemmap.ac.uk/person/nicky-l-grant/

## Step 4: Add the item to the AI context files

Once the Wikidata item is created, you'll get a Q-number (e.g., Q12345678).

1. Add to `llms.txt`: `Wikidata: Q12345678 — https://www.wikidata.org/wiki/Q12345678`
2. Add to `llms-extended.txt` under Identity section
3. Add `"https://www.wikidata.org/wiki/Q12345678"` to the sameAs arrays in:
   - `index.html` (Person schema)
   - `about.html` (Person schema)
   - `credentials.html` (Person schema)

## Step 5: Notable work (the Hausman chapter)

After creating the main entity, you can add the book chapter as a separate item:
1. Create new item: "Overcoming the Many Weak Instrument Problem Using Normalized Principal Components"
2. P31 = Q13442814 (scholarly article / book chapter)
3. P50 = [link to Dr Grant's Wikidata entity]
4. P1433 = Essays in Honor of Jerry Hausman (create if needed)
5. P577 = 2012-12-17 (publication date)
6. P356 = 10.1108/S0731-9053(2012)0000029010 (DOI)
7. P724 = https://www.emerald.com/books/edited-volume/15951/chapter-abstract/87608698/

---

## Notability note

Wikidata has much lower barriers than Wikipedia. Verifiable academics with:
- Published peer-reviewed work ✓ (Springer journal, Emerald book chapter, CeMMAP)
- University positions ✓ (Manchester, St Andrews)
- Persistent academic identifiers ✓ (ORCID)

...are entirely appropriate Wikidata items. No Wikipedia article is required for Wikidata inclusion.
