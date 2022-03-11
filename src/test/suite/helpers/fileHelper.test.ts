import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { FileHelper } from '../../../helpers/fileHelper';
// import * as myExtension from '../../extension';

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
});
