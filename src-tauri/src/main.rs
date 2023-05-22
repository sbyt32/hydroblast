// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use regex::Regex;
fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![titlebar_name])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
//   tauri::Builder::default()
//     .invoke_handler(tauri::generate_handler![locate_link])
//     .run(tauri::generate_context!())
//     .expect("something broke in parsing regex ig");
}

#[tauri::command]
fn titlebar_name(route: &str) -> String {
  format!("Hydroblast - {}", route)
}

// #[tauri::command]
// fn locate_link(text: &str) -> String {
//   let re = Regex::new(r"(http[s]?://[\w./-]*)").unwrap();
//   format!("<a href='{}'>{}</a>", re.as_str(), re.as_str())
// }