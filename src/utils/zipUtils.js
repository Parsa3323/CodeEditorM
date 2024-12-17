import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadAsZip = async (files) => {
  const zip = new JSZip();

  const addToZip = (items, currentPath = '') => {
    items.forEach(item => {
      const itemPath = currentPath ? `${currentPath}/${item.name}` : item.name;
      if (item.type === 'file') {
        zip.file(itemPath, item.content || '');
      } else if (item.type === 'folder' && item.children) {
        addToZip(item.children, itemPath);
      }
    });
  };

  addToZip(files);
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'project.zip');
};