# Complete builder of 50 ACLS cases
import json

raw_cases = []

# Template generator helper
def make_case(cid, num, title, ctype, arrest_type, shockable, diff,
              pname, page, pgender, ploc, phist, ppres,
              ihr, ibp, ispo2, ietco2, irr, itemp, irhythm, irhythm_name, istable, ireason, iconsc, iairway, iiv,
              deg_msg,
              ahr, abp, aspo2, aetco2, arr, atemp, arhythm, arhythm_name, aconsc,
              rhr, rbp, rspo2, retco2, rrr, rtemp, rrhythm, rrhythm_name, rconsc,
              rev_cause, hyt_cat, notes,
              phys, pocus, labs, hist_witness):
    return {
        "id": f"caso-{num}",
        "title": f"Caso {num}: {title}",
        "type": ctype,
        "arrestType": arrest_type,
        "isShockable": shockable,
        "difficulty": diff,
        "patient": {
            "name": pname,
            "age": page,
            "gender": pgender,
            "location": ploc,
            "history": phist,
            "presentation": ppres
        },
        "initialVitals": {
            "hr": ihr,
            "bp": ibp,
            "spo2": ispo2,
            "etco2": ietco2,
            "rr": irr,
            "temp": itemp,
            "rhythm": irhythm,
            "rhythmName": irhythm_name,
            "isStable": istable,
            "stabilityReason": ireason,
            "consciousness": iconsc,
            "airway": iairway,
            "ivAccess": iiv
        },
        "degenerationMessage": deg_msg,
        "arrestVitals": {
            "hr": ahr,
            "bp": abp,
            "spo2": aspo2,
            "etco2": aetco2,
            "rr": arr,
            "temp": atemp,
            "rhythm": arhythm,
            "rhythmName": arhythm_name,
            "pulsePresent": False,
            "consciousness": aconsc
        },
        "requiredInterventions": {
            "initialExpected": ["oxigeno", "monitor", "via_iv"] + (["cardioversion_sincronizada"] if ctype == "taquicardia" and not istable else ["atropina", "marcapasos"]),
            "arrestExpected": ["iniciar_rcp", "adrenalina"] + (["desfibrilar", "amiodarona"] if shockable else ["buscar_hyt"]),
            "postRceExpected": ["identificar_rce", "tomar_pa", "ecg_12_derivaciones"]
        },
        "rceVitals": {
            "hr": rhr,
            "bp": rbp,
            "spo2": rspo2,
            "etco2": retco2,
            "rr": rrr,
            "temp": rtemp,
            "rhythm": rrhythm,
            "rhythmName": rrhythm_name,
            "pulsePresent": True,
            "consciousness": rconsc
        },
        "reversibleCause": rev_cause,
        "hytCategory": hyt_cat,
        "teachingNotes": notes,
        "clinicalExam": {
            "physical": phys,
            "pocus": pocus,
            "labs": labs,
            "history": hist_witness
        }
    }

print("make_case defined")
