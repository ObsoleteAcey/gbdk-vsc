import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { FileHelper } from '../../../helpers/fileHelper';
import * as mockfs from 'mock-fs';
import mock = require('mock-fs');

suite('Filehelper Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Remove extension with basic filename', () => {
        const fileName = "mySourceFile.c";
        const result = FileHelper.removeExtensionFromFilename(fileName);

		assert.strictEqual(result, "mySourceFile");
	});

    test('Remove extension from filename with multiple fullstops', () => {
        const fileName = "my.source.file.c";
        const result = FileHelper.removeExtensionFromFilename(fileName);

		assert.strictEqual(result, "my.source.file");
	});

    test('Throws when filename with no extension supplied', () => {
        const fileName = "mySourceFile";

        assert.throws(() => FileHelper.removeExtensionFromFilename(fileName));
	});

    test('Throws when filename is empty', () => {
        const fileName = "";

        assert.throws(() => FileHelper.removeExtensionFromFilename(fileName));
	});

    test('Add extension to existing filename successfully using full extension', () => {
        const fileName = "mySourceFile.c";
        const result = FileHelper.replaceFileExtension(fileName, ".o");

		assert.strictEqual(result, "mySourceFile.o");
	});

    test('Add extension to existing filename successfully using partial extension', () => {
        const fileName = "mySourceFile.c";
        const result = FileHelper.replaceFileExtension(fileName, "o");

		assert.strictEqual(result, "mySourceFile.o");
	});

    test('Test getFilesWithSpecificExtensions gets files with .c extension when c extensuon asked for', async () => {
        const mockFS = mock({
            'test/dir/': {
              'some-file.txt': 'text file should remain',
              'someSource.c' : 'c sounce file should be retrieved',
              'empty-dir': {/** empty directory */}
            }
        });
        
        const result = await FileHelper.getFilesWithSpecificExtensions('test\\dir', ["c"]);

		assert.strictEqual(result.length, 1);
        assert.deepEqual(result, [{
            path: 'test\\dir\\',
            file: 'someSource.c'
        }]);
	});

    test('Test getFilesWithSpecificExtensions gets all files in dir with empty extension array', async () => {
        const mockFS = mock({
            'test/dir/': {
              'some-file.txt': 'text file should remain',
              'someSource.c' : 'c sounce file should be retrieved',
              'empty-dir': {/** empty directory */}
            }
        });
        
        const result = await FileHelper.getFilesWithSpecificExtensions('test\\dir', []);

		assert.strictEqual(result.length, 2);
        assert.deepEqual(result, [
            {
                path: 'test\\dir\\',
                file: 'some-file.txt'
            },
            {
                path: 'test\\dir\\',
                file: 'someSource.c'
            }
        ]);
	});
});
