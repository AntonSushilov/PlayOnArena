import math
from pprint import pprint

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        chunk = lst[i:i + n]
        yield chunk

def split_array_on_chunks(lst, chunk_size):
    return list(chunks(lst, chunk_size))


def add_empty_matches(arr):
    count_matches = len(arr) * 2 - 1
    while len(arr) < count_matches:
        template = {
            "num_match": len(arr)+1,
            "owner": None,
            "guest": None,
            "datetime": None,
            "owner_points": 0,
            "guest_points": 0,
            "round": None
        }
        arr.insert(0, template)
        # arr.insert(0, {
        #     "id": len(arr),
        #     "title": f"match {len(arr)}",
        #     "owner": None,
        #     "guest": None,
        # })
    return arr

def split_for_round(arr):
    res = []
    chunk_size = 1
    while len(arr) > 0:
        tmp = []
        for i in range(chunk_size):
            tmp.append(arr.pop(0))
        chunk_size *= 2
        res.append(tmp)
    return res

def generate_first_round(arr):
    round_matches = split_array_on_chunks(arr, 2)
    matches = []
    for i, match in enumerate(round_matches):
        template = {
            "num_match": i+1,
            "owner": match[0],
            "guest": match[-1],
            "datetime": None,
            "owner_points": 0,
            "guest_points": 0,
            "round": None
        }
        matches.append(template)
    return matches

TEAMS = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",

]

input_matches = generate_first_round(TEAMS)
pprint(input_matches)
print("\n")
input_matches = add_empty_matches(input_matches)
pprint(input_matches)
print("\n")
matches = input_matches.copy()
matches_round = split_for_round(input_matches)
pprint(matches_round)
print("\n")
import json
print(json.dumps(matches_round, ensure_ascii=False, indent=4))
matches_slots = []
slot = {
    "match": None,
    "left": None,
    "right": None,
    "next": None
}
matches_slots = [{**slot, "num_slot": i} for i in range(1, len(matches)+1)]
pprint(matches_slots)
print("\n")

matches_slots_round = split_for_round(matches_slots)
pprint(matches_slots_round)
print("\n")

prev_round = None
prev_slots = None
result = []
for i, m_r in enumerate(matches_round):
    # print(f"\ni----{i}----")
    sl = matches_slots_round[i]
    # pprint(m_r)
    # pprint(sl)
    tmp = []
    for j, m in enumerate(m_r):
        # print(f"j----{j}----")
        # pprint(m)
        # pprint(sl)
        res_sl = sl[j]
        # print(m)
        # print("\n")
        res_sl["match"] = m.get("num_match")
        if prev_slots is not None:
            # print("prev_slots")
            # pprint(prev_slots)
            res_sl["next"] = prev_slots[j//2].get("num_slot")
            slots = split_array_on_chunks(sl, 2)
            # print("slots", j)
            # pprint(slots)
            result[i - 1][j // 2]["left"] = slots[j//2][0].get("num_slot")
            result[i - 1][j // 2]["right"] = slots[j//2][1].get("num_slot")
            # print("res_sl", m)
        tmp.append(res_sl)
    result.append(tmp)
    prev_round = m_r
    prev_slots = tmp


print("\n matches" )
pprint(matches)
print("\n result" )
pprint(result)

