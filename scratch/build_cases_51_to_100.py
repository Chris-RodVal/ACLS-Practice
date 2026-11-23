# Script to generate Cases 51 to 100 for ACLS Simulator
import json

def make_c(num, title, ctype, arrest_type, shockable, diff,
           pname, page, pgender, ploc, phist, ppres,
           ihr, ibp, ispo2, ietco2, irr, itemp, irhythm, irhythm_name, istable, ireason, iconsc, iairway, iiv,
           deg_msg,
           ahr, abp, aspo2, aetco2, arr, atemp, arhythm, arhythm_name, aconsc,
           rhr, rbp, rspo2, retco2, rrr, rtemp, rrhythm, rrhythm_name, rconsc,
           rev_cause, hyt_cat, notes,
           phys, pocus, labs, hist_witness):
    
    init_exp = ["oxigeno", "monitor", "via_iv"]
    if ctype == "taquicardia":
        if not istable:
            init_exp.append("cardioversion_sincronizada")
    elif ctype == "bradicardia":
        init_exp.append("atropina")

    if shockable:
        arrest_exp = ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"]
    else:
        arrest_exp = ["iniciar_rcp", "adrenalina", "buscar_hyt"]

    post_exp = ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]

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
            "initialExpected": init_exp,
            "arrestExpected": arrest_exp,
            "postRceExpected": post_exp
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

print("make_c ready")
