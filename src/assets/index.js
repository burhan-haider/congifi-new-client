import searchOne from './icons/topbar/search_1.png'
import searchTwo from './icons/topbar/search_2.png'
import menu from './icons/topbar/list.png'
import pinBlack from './icons/pin-black.png'
import pinned from './icons/pinned.png'

import dashboard from './icons/feature/dashboard.png'
import actionManagement from './icons/feature/actionManagement.png'
import drsCaseWorkflow from './icons/feature/drsCaseWorkflow.png';
import masterFeature from './icons/feature/allMaster.png'
import userAndRole from './icons/feature/userAndRole.png'
import scenarios from './icons/feature/scenarios.png'
import scanning from './icons/feature/scanning.png'
import labelsFeature from './icons/feature/labelsFeature.png'
import features from './icons/feature/features.png';
import closeBlue from './icons/close_blue.png';
import closeWhite from './icons/close_white.png';
import pdf from './icons/new_pdf.png';
import excel from './icons/new_excel.png';
import csv from './icons/new_csv.png';
import print from './icons/new_print.png';
import invTools from './icons/feature/invTools.png'
import checkerActivity from './icons/feature/checkerActivity.png'
import alEngine from './icons/feature/alertEngine.png'
import audit from './icons/feature/auditLog.png'
import raiseSuspision from './icons/feature/raiseSuspicion.png'
import riskCategorization from './icons/feature/riskDashboard.png'

import viewMatches from './icons/View_Matches.png'
import addToAccept from './icons/Add_To_Acceptlist.png'

import list from './icons/topbar/list.png'
import chat from './icons/topbar/chat.png'
import email from './icons/topbar/email.png'
import log from './icons/topbar/log.png'
import path from './icons/topbar/path.png'
import reports from './icons/feature/reports.png'
import settings from './icons/topbar/settings.png'
import speak from './icons/topbar/speak .png'
import trace from './icons/topbar/trace.png'
import search1 from './icons/topbar/search_1.png'

import whitePin from './icons/Pin-02.png'
import yellowPin from './icons/Pin-01.png'

import collapse from './icons/collapse.png'
import expand from './icons/expand.png'


const icons = {
    searchOne,
    searchTwo,
    menu,
    pinBlack,
    pinned,
    dashboard,
    actionManagement,
    scenarios,
    scanning,
    userAndRole,
    labelsFeature,
    features,
    closeBlue,
    closeWhite,
    pdf,
    excel,
    csv,
    print,
    viewMatches,
    addToAccept,
    list,
    chat,
    email,
    log,
    path,
    reports,
    settings,
    speak,
    trace,
    search1,
    drsCaseWorkflow,
    masterFeature,
    whitePin,
    yellowPin,
    collapse,
    expand,
    invTools,
    raiseSuspision,
    alEngine,
    audit,
    checkerActivity,
    riskCategorization
}

const getIconByKey = (key) => {
    return icons[key];
}

export default getIconByKey;