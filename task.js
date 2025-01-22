/**
 * Fungsi untuk menampilkan hasil download
 * @param {string} result result - Nama file yang didownload
 */
const showDownload = (result) => {
  console.log("Download selesai");
  console.log(`Hasil Download: ${result}`);
};

/**
 * Fungsi untuk download file 
 * @returns {Promise<string>} callback - Function callback show
 */
const download = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = "windows-10.exe";
      resolve(result);
    }, 3000);
  });
};

/**
 * Fungsi untuk menjalankan proses download menggunakan async/await
 */
const main = async () => {
  try {
    const result = await download();
    showDownload(result);
  } catch (error) {
    console.error("Terdapat kesalahan saat mendownload file:", error);
  }
};

main();
