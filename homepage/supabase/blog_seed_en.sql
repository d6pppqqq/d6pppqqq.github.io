-- Koi 作品集 · 英文 blog seed（4 篇副线经历）
-- 运行：Supabase Dashboard → SQL Editor → 粘贴全文执行（SQL 绕过 RLS）
-- 幂等：slug 冲突则跳过，可重复执行

insert into public.blog_posts (title, slug, excerpt, content, tags, published, created_at)
values
(
 'Does Wang Hao Remember Ryu Seung-min?',
 'wang-hao-ryu-seung-min',
 'Hugo Calderano wins the World Cup, and a 2004 Olympic final comes flooding back. Why the biggest upsets in table tennis are the stories nobody else writes — a post on riding a news spike within hours.',
 'The moment Hugo Calderano took the World Cup gold, my feed filled with results. Scores, brackets, reaction GIFs. All accurate. All forgotten by Monday.' || chr(10) || chr(10) ||
'What nobody was typing was a name from 2004: Ryu Seung-min. The Athens final — Wang Hao on the other side of the net, a gold that reshaped what the Chinese team assumed was inevitable. Hugo is not Ryu. But the shape of the story is: the kid from a country where table tennis is a pub game, beating the system that turned winning into logistics.' || chr(10) || chr(10) ||
'So I wrote one question as a title — "王皓会不会想起柳承敏" — and hit publish while the match was still trending. It pulled 70K+ reads on Xiaohongshu (an estimated 350K+ impressions) in days. On a personal account with no budget, no distribution deal, and no team.' || chr(10) || chr(10) ||
'The mechanics, honestly:' || chr(10) ||
'1. The event is the wave — you cannot make it. Speed is the only edge you control. The post was live the same night; by day three the news cycle had moved on.' || chr(10) ||
'2. Facts get you indexed; nostalgia gets you shared. The result is what people checked. Ryu Seung-min is what they commented about.' || chr(10) ||
'3. A title should be a question only your readers can answer. If everybody can write it, nobody will. If nobody can write it, nobody will click either. The 2004 final sits exactly in the gap.' || chr(10) || chr(10) ||
'This is the whole trick of hot-topic content, and it transfers: the algorithm is not your audience — a spike and a memory are. Same logic, whether you are selling a phone case or an AI hardware card.' || chr(10) || chr(10) ||
'(This is one of a few posts where I record the things I do outside the office. Table tennis first.)',
 array['table-tennis','content','growth','hot-topic'],
 true,
 timestamptz '2026-09-05 21:00:00+00'
),
(
 'The Algorithm of a Blade: 15 Boards, 6 Film Bodies, and the Economics of Gear',
 'algorithm-of-a-blade',
 'From Vis to Long 5, from Canon to Minolta — what collecting table tennis blades and cameras taught me about versions, metas, and why enthusiasts pay twice for half the performance.',
 'Fifteen blades have passed through my hands: DHS Hurricane Long 5 and Long 5x, Skyline 506A, Hurricane Bo and KF9; Butterfly Vis, Harimoto ALC, Ovtcharov ALC; Stiga CL; Yasaka Ma Lin Soft Carbon; Donic Waldner Carbon; Galaxy Pro-01, Purple Dragon 537, T8s; Victas Koki Ni.' || chr(10) || chr(10) ||
'If I wanted, I could own a hundred blades and two hundred rubbers. That is not a brag — it is a statement about how the market works. Table tennis gear has a version meta like any live-service game: a glue change, a ball change, a new 40+ plastic era, and suddenly your holy grail is a different animal. Rubbers are consumables; blades are the platform. The enthusiast economy runs on the gap between perceived and actual marginal performance — and on the story each brand wraps around that gap.' || chr(10) || chr(10) ||
'Cameras were the same addiction with different letters: twelve digital bodies bought, long-term tested and reviewed properly, plus six film bodies across Canon, Minolta, Olympus and Pentax. Twelve Xiaohongshu posts documenting them, 40K+ impressions. A few thousand words each, written the way I actually shoot — which is to say, slowly, and after a conference shoot where I am the person the school calls.' || chr(10) || chr(10) ||
'What the two hobbies share is the analysis muscle I now get paid for: identify the meta, measure what actually changes outcomes, price the difference between the real gain and the marketed one. Most gear purchases — like most growth budgets — are stories we tell ourselves with a receipt attached.' || chr(10) || chr(10) ||
'My own level? About 1500 on kaiqiuwang, the Chinese open-rating system. Serious hobbyist, unserious training schedule.' || chr(10) || chr(10) ||
'(Part two of the things-I-do-outside-work series.)',
 array['table-tennis','photography','gear','review'],
 true,
 timestamptz '2026-09-03 18:00:00+00'
),
(
 'Goodbye, ThinkPad: A Farewell Portrait for a Laptop',
 'goodbye-thinkpad',
 'Before I sold my ThinkPad, I gave it a studio shoot. 3,000+ reads for a post about a piece of hardware nobody needed. What that tells you about object photography — and about letting things retire with dignity.',
 'I sold my ThinkPad. Before it left, I set up a light and took a proper portrait of it — the kind of farewell still a production crew takes of a finished cast — and posted it. Three thousand strangers read a goodbye to a laptop.' || chr(10) || chr(10) ||
'Object photography is the least glamorous branch of the craft and the most honest one. No golden hour to hide behind, no subject who can act. Texture, wear, the one angle where a used thing looks like a life rather than a listing. The keyboard shine is the story; polish it away and you are just another seller with a stock photo.' || chr(10) || chr(10) ||
'This is the same instinct behind everything I shoot — conference photos for the school (I ran a 40-person media team and was, within a very small and defensible margin, the go-to conference photographer in my college), a graduation MV, three interviews with retired professors that I planned, directed, shot and cut end to end. Equipment ages out. Coverage does not.' || chr(10) || chr(10) ||
'The post did 3,000+ reads with nothing to sell anyone. On the internet, that is basically a standing ovation for a lamp.' || chr(10) || chr(10) ||
'(Part three of the things-I-do-outside-work series.)',
 array['photography','gear','essay'],
 true,
 timestamptz '2026-09-01 12:00:00+00'
),
(
 'Tomokazu Harimoto Wins Again, and the Comment Section Has a Civil War',
 'harimoto-wtt-champions',
 'A smaller follow-up post (2,000+ reads): what Harimoto victories say about Chinese table tennis fandom, and how to write about a controversial subject without picking a side.',
 'The last time Tomokazu Harimoto lifted a WTT Champions trophy, I wrote a quick take the same day. It only did about two thousand reads — the first post in this series was a bigger wave — but the comments were just as instructive.' || chr(10) || chr(10) ||
'Harimoto is the rare figure in Chinese table tennis discourse who is simultaneously the most-watched rival and the most-defended outsider. Every win is a small identity crisis for a section of the audience: proud of the kid, furious at the system that let him grow abroad, weirdly moved that a Japanese player keeps the sport interesting for them.' || chr(10) || chr(10) ||
'The writing lesson, from someone who covered sports and conferences for a living: controversy is not something you create, it is something you locate. The audience already disagrees with itself — your job is to name the disagreement so precisely that both sides feel seen. That is how a no-budget account gets read.' || chr(10) || chr(10) ||
'(From a side project of mine: table-tennis commentary on Xiaohongshu, where I mostly write about the stories the results pages leave out.)',
 array['table-tennis','content','fandom'],
 true,
 timestamptz '2026-08-30 09:00:00+00'
)
on conflict (slug) do nothing;
