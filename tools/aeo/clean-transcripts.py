# Turns YouTube auto-captions into paragraphed transcripts. Only fixes clear mis-hearings
# (names, product words); wording is otherwise left exactly as spoken.
import json, re, sys
src = sys.argv[1]
FIX = {
  'AwLxrRrYye8': [('Jayden', 'Jaden'), ('5.1 million views than 2 weeks', '5.1 million views in less than 2 weeks'),
                  ('you will not see in qualified traffic', 'you do not see qualified traffic'), ('cuz', 'because')],
  'Rpt5F6w_Vpk': [('Jayden', 'Jaden'), ('Nems, Elevate', 'Nemzzz, "Elevate"'), ('Central C Doja', 'Central Cee, "Doja"'),
                  ('Pay promotion', 'Paid promotion'), ('featured Atlanta spot', 'featured lander spot'),
                  ('this Lander option', 'this lander option'), ('slightly different from the priority', 'slightly different from the prior one'),
                  ('a MP3 or wave file', 'an MP3 or WAV file'), ('do not have to to anything', 'do not have to pay anything'),
                  ('Uh we have', 'We have'), ('more than added, say the one', 'more than, say, the one')],
}
META = {
  'AwLxrRrYye8': {'name': 'Do You Want To Own Distribution?', 'speaker': 'Emrah Bayraktar, co-founder of Vision Clipping',
                  'duration': 'PT4M56S', 'uploadDate': '2026-09-21', 'page': 'https://vision-clipping.com/'},
  'Rpt5F6w_Vpk': {'name': 'Music Clipping Overview | Vision Clipping', 'speaker': 'Jaden Malcolm, co-founder of Vision Clipping',
                  'duration': 'PT8M41S', 'uploadDate': '2026-09-21', 'page': 'https://vision-clipping.com/music/'},
}
out = {}
for vid in FIX:
    t = open(f'{src}/{vid}.txt').read().strip()
    for a, b in FIX[vid]:
        t = t.replace(a, b)
    sents = re.split(r'(?<=[.?!])\s+(?=[A-Z])', t)
    paras, cur = [], []
    for s in sents:
        cur.append(s)
        if sum(len(x.split()) for x in cur) >= 90:
            paras.append(' '.join(cur)); cur = []
    if cur: paras.append(' '.join(cur))
    out[vid] = {**META[vid], 'id': vid, 'paragraphs': paras, 'text': ' '.join(paras)}
json.dump(out, open('transcripts.json', 'w'), indent=1, ensure_ascii=False)
for v in out: print(v, len(out[v]['paragraphs']), 'paras', len(out[v]['text'].split()), 'words')
